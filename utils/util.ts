import { pipeline, env, FeatureExtractionPipeline } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";
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
}

function getFilename(filename: string) {
  const documentName = filename.substring(filename.lastIndexOf("/") + 1);
  return (
    documentName.substring(0, documentName.lastIndexOf(".")) || documentName
  );
}
