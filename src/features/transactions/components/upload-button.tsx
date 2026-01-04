import { Button } from "@/src/components/ui/button";
import { normalizeKeys } from "@/src/lib/utils";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

type Props = {
  onUpload: (results: any) => void;
};

export default function UploadButton({ onUpload }: Props) {
  const { CSVReader } = useCSVReader();
  // todo: add a paywall
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        const data = normalizeKeys(results.data);
        const finalResults = {
          ...results,
          data: data,
        };
        onUpload(finalResults);
      }}
      config={{
        header: true,
        skipEmptyLines: true,
      }}
    >
      {({ getRootProps }: any) => (
        <Button size={"sm"} {...getRootProps()}>
          <Upload className="size-4" />
          <span>Import</span>
        </Button>
      )}
    </CSVReader>
  );
}
