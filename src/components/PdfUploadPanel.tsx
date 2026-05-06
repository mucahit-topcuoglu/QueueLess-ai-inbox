import { FileUploadZone } from "./FileUploadZone";
import { InfoCard } from "./InfoCard";

export function PdfUploadPanel({ title, description }: { title: string; description: string }) {
  return (
    <InfoCard title={title} description={description}>
      <FileUploadZone />
    </InfoCard>
  );
}
