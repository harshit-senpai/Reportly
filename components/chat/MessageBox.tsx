import { Card, CardContent, CardFooter } from "../ui/card";

interface MessageBoxProps {
  role: string;
  content: string;
}

export const MessageBox = ({ role, content }: MessageBoxProps) => {
  return (
    <Card>
      <CardContent>{content}</CardContent>
      {role !== "user" && (
        <CardFooter className="border-t bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
          Disclaimer: The medical advice and recommendations provided by this
          application are for informational purposes only and should not replace
          professional medical diagnosis, treatment, or advice.
        </CardFooter>
      )}
    </Card>
  );
};
