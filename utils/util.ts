import { pipeline, env, FeatureExtractionPipeline } from "@xenova/transformers";
import { Pinecone, PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

env.cacheDir = "./node_modules/.cache/transformers";
env.allowLocalModels = true;

export async function updateVectorDb(
  client: Pinecone,
  indexName: string,
  namespace: string,
  docs: Document[],
  progressCallback: (
    filename: string,
    totalChunks: number,
    chunksUpserted: number,
    iscomplete: boolean
  ) => void
) {
  const modalName = "mixedbread-ai/mxbai-embed-large-v1";
  const extractor = await pipeline("feature-extraction", modalName, {
    quantized: false,
    local_files_only: false,
  });
  console.log(extractor);
  for (const doc of docs) {
    await processDoc(client, indexName, namespace, doc, extractor);
  }
}

async function processDoc(
  client: Pinecone,
  indexName: string,
  namespace: string,
  doc: Document,
  extractor: FeatureExtractionPipeline
) {
  const splitter = new RecursiveCharacterTextSplitter();
  const documentChunk = await splitter.splitText(doc.pageContent);
  const filename = getFilename(doc.metadata.source);

  console.log(documentChunk.length);
  let chunkBatchIndex = 0;
  while (documentChunk.length > 0) {
    chunkBatchIndex++;
    const chunkBatch = documentChunk.splice(0, 10);
    await processOneBatch(
      client,
      indexName,
      namespace,
      chunkBatch,
      chunkBatchIndex,
      filename,
      extractor
    );
  }
}

function getFilename(filename: string) {
  const documentName = filename.substring(filename.lastIndexOf("/") + 1);
  return (
    documentName.substring(0, documentName.lastIndexOf(".")) || documentName
  );
}
async function processOneBatch(
  client: Pinecone,
  indexName: string,
  namespace: string,
  chunkBatch: string[],
  chunkBatchIndex: number,
  filename: string,
  extractor: FeatureExtractionPipeline
) {
  const output = await extractor(
    chunkBatch.map((string) => string.replace(/\n/g, "")),
    {
      pooling: "cls",
    }
  );
  console.log(output);
  const embeddingsBatch = output.tolist();
  let vectorBatch: PineconeRecord<RecordMetadata>[] = [];

  for(let i=0; i< chunkBatch.length; i++) {
    const chunk = chunkBatch[i];
    const embedding = embeddingsBatch[i];

    const vector: PineconeRecord<RecordMetadata> = {
      id: `${filename}-${chunkBatchIndex}-${i}`,
      values: embedding,
      metadata: {
        chunk: chunk,
      },
    };
    vectorBatch.push(vector);
  }

  const index = client.Index(indexName).namespace(namespace);
  await index.upsert(vectorBatch);
  vectorBatch = [];
}
