import { Badge } from "../ui/badge";
import { useChat } from "ai/react";
import { MessageBox } from "./MessageBox";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";

export const ChatComponent = ({ reportSummary }: { reportSummary: string }) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/medicalChat",
    });
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
      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, {
            data: {
              reportData: reportSummary,
            },
          });
        }}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here"
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
        />
        <div className="flex items-center p-3 pt-8">
          <Button
            className="ml-auto"
            type="submit"
            size={"sm"}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Ask"}
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CornerDownLeft className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
