import { Separator } from "@/src/components/ui/separator";
import { formatCurrency } from "@/src/lib/utils";
import { format } from "date-fns";

export default function CustomTooltip({ active, payload }: any) {
  if (!active) return null;
  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expenses = payload[1].value;

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted text-muted-foreground px-3 py-2 text-sm">
        {format(date, "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="space-y-1 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="size-1.5 rounded-full bg-blue-500" />
            <p className="text-muted-foreground text-sm">Income</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(income)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-muted-foreground text-sm">Expenses</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
}
