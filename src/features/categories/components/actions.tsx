import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import useConfirm from "@/src/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useDeleteCategory } from "../api/use-delete-category";
import { useOpenCategory } from "../state/use-open-category";

type Props = {
  id: string;
};

export default function Actions({ id }: Props) {
  const { onOpen } = useOpenCategory();
  const { mutate: deleteCategory, isPending } = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm();

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Are You Sure?",
      message: "You are about deleting this category.",
    });
    if (ok) {
      deleteCategory();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isPending} onClick={() => onOpen(id)}>
            <Edit className="size-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
            <Trash className="size-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
