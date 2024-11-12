import { FileUploadForm } from "@/components/FileUpladForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UploadPage() {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Increase your knowladge base</CardTitle>
          <CardDescription className="text-muted-foreground">
            Add new documents to DB
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <FileUploadForm />
        </CardContent>
      </Card>
    </div>
  );
}
