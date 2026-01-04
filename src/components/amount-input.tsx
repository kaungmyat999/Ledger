import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import CurrencyInput from "react-currency-input-field";
import { cn } from "../lib/utils";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function AmountInput({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;

    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div>
      <div className="relative">
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "absolute top-1/2 left-1.5 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-md bg-slate-400 p-2 transition hover:bg-slate-500 disabled:cursor-not-allowed",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600",
              )}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            User [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
        <CurrencyInput
          prefix="$"
          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 ps-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          decimalScale={2}
          onValueChange={(val) => onChange(val ?? "")}
          disabled={disabled}
        />
      </div>
      <p>
        {isIncome && "This will count as an income"}
        {isExpense && "This will count as an expense"}
      </p>
    </div>
  );
}
