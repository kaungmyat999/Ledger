import { client } from "@/src/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;
export function useDeleteCategory(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.categories[":id"].$delete({
        param: { id },
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Category Deleted");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete category");
    },
  });

  return mutation;
}
