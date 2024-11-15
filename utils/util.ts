import { pipeline, env, FeatureExtractionPipeline } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";

// Configure environment before using pipeline
env.cacheDir = "./node_modules/.cache/transformers"; // Set cache directory
env.allowLocalModels = true; // Allow local model loading

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
  console.log(doc);
}
