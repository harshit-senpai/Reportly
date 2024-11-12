"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Database, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export const FileUploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [indexName, setIndexName] = useState("");
  const [namespace, setNamespace] = useState("");

  const onUpload = async () => {
    setIsUploading(true);
    const response = await axios.post("/api/upload", {
      indexName,
      namespace,
    });

    console.log(response);
  };

  return (
    <div>
      <>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-2 border border-border rounded-lg gap-4 p-6">
            <div className="gap-4 relative">
              <Button
                className="absolute -right-4 -top-4"
                variant={"ghost"}
                size={"icon"}
              >
                <RefreshCcw />
              </Button>
              <Label>Files List:</Label>
              <Textarea
                readOnly
                className="mt-2 min-h-24 resize-none p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="grid gap-2">
                <Label>Index Name</Label>
                <Input
                  value={indexName}
                  onChange={(e) => setIndexName(e.target.value)}
                  placeholder="Index name"
                  className="disabled:cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 "
                  disabled={isUploading}
                />
              </div>
              <div className="grid gap-2">
                <Label>Namespace</Label>
                <Input
                  value={namespace}
                  onChange={(e) => setNamespace(e.target.value)}
                  placeholder="Enter namespace"
                  className="disabled:cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 "
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
          <Button
            className="h-full w-full"
            variant={"outline"}
            disabled={isUploading}
            onClick={onUpload}
          >
            <Database className="mr-2 h-4 w-4 text-rose-500" />
            Add Documents
          </Button>
        </div>
      </>
    </div>
  );
};
