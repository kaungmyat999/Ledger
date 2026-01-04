import { formatCurrency } from "@/src/lib/utils";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function RadialVariant({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="30%"
        barSize={10}
        innerRadius={90}
        outerRadius={40}
        data={data.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }))}
      >
        <RadialBar background dataKey="value" />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => (
            <ul className="flex flex-col space-y-2">
              {payload.map((item: any, index: number) => {
                return (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-muted-foreground text-sm">
                        {item.value}
                      </span>
                      <span className="text-sm">
                        {formatCurrency(item.payload.value)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
