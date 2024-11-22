import { Badge } from "../ui/badge";
import { useChat } from "ai/react";
import { MessageBox } from "./MessageBox";

export const ChatComponent = ({ reportSummary }: { reportSummary: string }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="h-full bg-muted/50 relative flex flex-col min-h-[80vh] rounded-xl p-4 gap-4">
      <Badge className="absolute right-3 top-4">
        {reportSummary ? "Report Added" : "No Report Added"}
      </Badge>
      <div className="flex-1 overflow-auto"></div>
      <div className="flex flex-col gap-4">
        {messages.map((message, idx) => {
          return (
            <MessageBox
              key={idx}
              role={message.role}
              content={message.content}
            />
          );
        })}
      </div>
    </div>
  );
};
