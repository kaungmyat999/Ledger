import { client } from "@/src/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;
export function useDeleteTransaction(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.transactions[":id"].$delete({
        param: { id },
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["transaction", id] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Transaction Deleted");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete transaction");
    },
  });

  return mutation;
}
