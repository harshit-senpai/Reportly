"use client";

import { ChatComponent } from "@/components/chat/ChatComponent";
import { ReportContent } from "@/components/ReportContent";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [reportSummary, setReportSummary] = useState<string>("");
  const onReportConfirmation = (reportSummary: string) => {
    setReportSummary(reportSummary);
    toast.success("Updated report summary");
  };

  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="hidden md:flex flex-col">
        <ReportContent onReportConfirmation={onReportConfirmation} />
      </div>
      <div className="lg:col-span-2 p-2">
        <ChatComponent reportSummary={reportSummary} />
      </div>
    </main>
  );
}
