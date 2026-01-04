import PieVariant from "@/src/components/charts/pie-variant";
import RadarVariant from "@/src/components/charts/radar-variant";
import RadialVariant from "@/src/components/charts/radial-variant";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Skeleton } from "@/src/components/ui/skeleton";
import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";
import { useState } from "react";

enum CHART_TYPES {
  PIE = "PIE",
  RADIAL = "RADIAL",
  RADAR = "RADAR",
}
type Props = {
  data?: { name: string; value: number }[];
};
export default function SpendingPie({ data = [] }: Props) {
  const [chartType, setChartType] = useState<CHART_TYPES>(CHART_TYPES.PIE);
  const onTypeChange = (type: CHART_TYPES) => {
    setChartType(type);
    // todo: add paywall
  };
  return (
    <Card className="border-none drop-shadow-xs">
      <CardHeader className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center lg:gap-0">
        <CardTitle className="line-clamp-1 text-xl">Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 w-full rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CHART_TYPES.PIE}>
              <div className="flex items-center gap-2">
                <PieChart className="size-4 shrink-0" />
                <p className="line-clamp-1">Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value={CHART_TYPES.RADAR}>
              <div className="flex items-center gap-2">
                <Radar className="size-4 shrink-0" />
                <p className="line-clamp-1">Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value={CHART_TYPES.RADIAL}>
              <div className="flex items-center gap-2">
                <Target className="size-4 shrink-0" />
                <p className="line-clamp-1">Radial Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-4">
            <FileSearch className="text-muted-foreground size-6" />
            <p className="text-muted-foreground text-sm">
              No data for this period.
            </p>
          </div>
        ) : (
          <>
            {chartType === CHART_TYPES.PIE && <PieVariant data={data} />}
            {chartType === CHART_TYPES.RADAR && <RadarVariant data={data} />}
            {chartType === CHART_TYPES.RADIAL && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function SpendingPieLoading() {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-full lg:w-[120px]" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[350px] w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
        </div>
      </CardContent>
    </Card>
  );
}
