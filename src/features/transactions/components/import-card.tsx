import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";
import { convertAmountToMiliunits } from "@/src/lib/utils";
import { format, parse } from "date-fns";
import { useState } from "react";
import ImportTable from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

type SelectedColumnsState = Record<string, string | null>;

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
  data: BodyItem[];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export default function ImportCard({ data, onCancel, onSubmit }: Props) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {},
  );
  const headers = Object.keys(data[0]);
  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null,
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }
      if (value === "skip") {
        value = null;
      }
      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };
  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedDate = {
      headers: headers.map((_header, index) => {
        const colIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${colIndex}`] || null;
      }),
      body: data.map((row) => {
        return Object.entries(row).map((item, index) => {
          const columnIndex = getColumnIndex(`column_${index}`);
          return selectedColumns[`column_${columnIndex}`] ? item[1] : null;
        });
      }),
    };

    const dataArr = mappedDate.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedDate.headers[index];
        if (header !== null) acc[header] = cell;
        return acc;
      }, {});
    });

    const formattedDataArr = dataArr.map((item) => {
      return {
        ...item,
        amount: convertAmountToMiliunits(parseFloat(item.amount)),
        date: format(parse(item.date, dateFormat, new Date()), outputFormat),
      };
    });
    onSubmit(formattedDataArr);
  };

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-xs">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="mb-2 flex flex-col gap-2 lg:mb-0">
            <span className="text-xl">Import Transactions</span>
            <span className="text-muted-foreground text-xs lg:text-sm">
              Select Transaction&apos;s Date, Payee and amount...
            </span>
          </CardTitle>
          <div className="flex flex-col gap-2 self-stretch lg:flex-row lg:items-center">
            <Button
              disabled={progress < requiredOptions.length}
              size={"sm"}
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
            <Button size={"sm"} onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={data}
            selectedColumns={selectedColumns}
            onTableHeadChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
