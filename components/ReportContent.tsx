"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export const ReportContent = () => {
  const [base64Data, setBase64Data] = useState<string>("");

  const handleReportSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    if (file) {
      const validImage = ["image/png", "image/jpeg", "image/jpg"];
      const validDoc = ["application/pdf"];

      const isValidImage = validImage.includes(file.type);
      const isValidDoc = validDoc.includes(file.type);

      if (!isValidImage && !isValidDoc) {
        toast.error("Filetype not supproted!");
      }

      if (validDoc) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const filecontent = reader.result as string;
          setBase64Data(filecontent);
        };
        reader.readAsDataURL(file);
      }

      if (isValidImage) {
        compressImage(file, (compressedFile: File) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const filecontent = reader.result as string;
            setBase64Data(filecontent);
          };
          reader.readAsDataURL(compressedFile);
        });
      }
    }
  };

  function compressImage(file: File, callback: (compressedFile: File) => void) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx!.drawImage(image, 0, 0);

        const quality = 0.1;
        const dataURL = canvas.toDataURL("image/jpeg", quality);

        const byteString = atob(dataURL.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const compressedFile = new File([ab], file.name, {
          type: "image/jpeg",
        });
        callback(compressedFile);
      };
      image.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }

  const extractDetails = async () => {
    if (!base64Data) {
      toast.error("Upload a valid Report");
      return;
    }

    const response = await axios.post("/api/extractedReport", {
      base64: base64Data,
    });

    if (response.status === 200) {
      const reportText = response.data;
      console.log(reportText);
    }
  };

  return (
    <div className="grid gap-6 w-full items-start p-4 pt-0 overflow-auto">
      <fieldset className="grid gap-6 rounded-lg relative border border-border p-4">
        <legend className="text-md font-semibold">Report Content</legend>
        <Input type="file" onChange={handleReportSelection} />
        <Button className="gap-4" onClick={extractDetails}>
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
