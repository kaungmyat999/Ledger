import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "date", "payee"];

export default function TableHeadSelect({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) {
  const currentSelected = selectedColumns[`column_${columnIndex}`];
  return (
    <Select
      value={currentSelected || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0",
          currentSelected && "text-blue-500",
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              className="capitalize"
              value={option}
              disabled={disabled}
              key={index}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
