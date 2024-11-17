"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const ReportContent = () => {
  return (
    <div className="grid gap-6 w-full items-start p-4 pt-0 overflow-auto">
      <fieldset className="grid gap-6 rounded-lg relative border border-border p-4">
        <legend className="text-md font-semibold">Report Content</legend>
        <Input type="file" />
        <Button className="gap-4">
          <Upload className="h-5 w-5" />
          <span>Upload Report</span>
        </Button>
        <Label>Report Summary</Label>
        <Textarea
          placeholder="Extracted summary from the report will appear here, Get better recommendations by providing additional patient history and symptoms..."
          className="resize-none min-h-72 p-3"
        />
        <Button variant={"outline"}>Submit Report</Button>
      </fieldset>
    </div>
  );
};
