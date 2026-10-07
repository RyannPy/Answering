"use client";

import { parseWorksheet } from "@/parser";
import { sampleWorksheetText } from "@/fixtures/sample-worksheet";
import { WorksheetViewer } from "@/components/worksheet/WorksheetViewer";

export default function Home() {
  const parseResult = parseWorksheet(sampleWorksheetText);

  if (!parseResult.ok) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-[var(--bg-elevated)] border border-[var(--error)]/30 rounded-lg p-6">
          <div className="text-xl font-semibold text-[var(--error)] mb-4">
            Failed to load worksheet
          </div>
          <div className="space-y-2">
            {parseResult.errors.map((error, idx) => (
              <div key={idx} className="text-[var(--text-primary)]">
                {error.question && `Question ${error.question}: `}
                {error.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <WorksheetViewer worksheet={parseResult.worksheet} />;
}
