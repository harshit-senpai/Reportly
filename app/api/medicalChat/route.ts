import { Message } from "ai/react";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const messages: Message[] = requestBody.messages;
  const userQuestion = messages[messages.length - 1].content;
  const reportData: string = requestBody.data.reportData;

  const searchQuery = `Patient medical report says: \n${reportData} \n\n ${userQuestion}`;
  console.log(requestBody);

  return new Response("Dummy response", { status: 200 });
}
