"use client";
import Chart from "@/src/components/charts/chart";
import ChartLoading from "@/src/components/charts/chart-loading";
import SpendingPie from "@/src/components/charts/spending-pie";
import { useGetSummary } from "@/src/features/summary/api/use-get-summary";

export default function DataCharts() {
  const { data, isLoading } = useGetSummary();
  return isLoading ? (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <ChartLoading />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <ChartLoading />
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
}
