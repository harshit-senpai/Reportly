import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Pinecone } from "@pinecone-database/pinecone";
import { updateVectorDb } from "@/utils/util";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { indexName, namespace } = req.body;

      if (!indexName || !namespace) {
        return res.status(400).json({
          error: "indexName and namespace are required",
        });
      }

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
            console.log(`${filename}-${totalChunks}-${chunksUpserted}-${isCompleted}`)
          if (!isCompleted) {
            res.write(
              JSON.stringify({
                filename,
                totalChunks,
                chunksUpserted,
                isCompleted,
              })
            );
          } else {
            res.end();
          }
        }
      );
    } catch (error) {
      console.error("[ERROR]:", error);
      return res.status(500).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};
