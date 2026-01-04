import { client } from "@/src/lib/hono";
import { convertAmountFromMiliunits } from "@/src/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetTransaction(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", id],
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({
        param: { id },
      });
      if (!res.ok) throw new Error("Failed to fetch transaction");
      const { data } = await res.json();
      return {
        ...data,
        amount: convertAmountFromMiliunits(data.amount),
      };
    },
  });
  return query;
}
