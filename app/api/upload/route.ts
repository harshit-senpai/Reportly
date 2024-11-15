import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Pinecone } from "@pinecone-database/pinecone";
import { updateVectorDb } from "@/utils/util";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { indexName, namespace } = await req.json();

  const loader = new DirectoryLoader("./documents", {
    ".pdf": (path: string) =>
      new PDFLoader(path, {
        splitPages: false,
      }),
    ".txt": (path: string) => new TextLoader(path),
  });

  const docs = await loader.load();

  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  await updateVectorDb(
    client,
    indexName,
    namespace,
    docs,
    (filename, totalChunks, chunksUpserted, isCompleted) => {
      if (!isCompleted) {
        return NextResponse.json({
          filename,
          totalChunks,
          chunksUpserted,
          isCompleted,
        });
      }
    }
  );
}
