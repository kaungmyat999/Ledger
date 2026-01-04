import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import TableHeadSelect from "./table-head-select";

type BodyItem = {
  amount: string;
  balance: string;
  completed_date: string;
  currency: string;
  description: string;
  fee: string;
  product: string;
  started_date: string;
  state: string;
  type: string;
};
type Props = {
  headers: string[];
  body: BodyItem[];
  selectedColumns: Record<string, string | null>;
  onTableHeadChange: (columnIndex: number, value: string | null) => void;
};

export default function ImportTable({
  headers,
  body,
  selectedColumns,
  onTableHeadChange,
}: Props) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((item, index) => (
            <TableRow key={index}>
              {Object.values(item).map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
