import { pipeline, env } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";

// Configure environment before using pipeline
env.cacheDir = './node_modules/.cache/transformers'; // Set cache directory
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
  const modalName =  "mixedbread-ai/mxbai-embed-large-v1";
  const extractor = await pipeline("feature-extraction", modalName, {
    quantized: false,
    local_files_only: false,
  });
}
