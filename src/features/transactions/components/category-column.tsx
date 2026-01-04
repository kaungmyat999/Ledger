import { cn } from "@/src/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useOpenCategory } from "../../categories/state/use-open-category";
import { useOpenTransaction } from "../state/use-open-transaction";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export default function CategoryColumn({ id, category, categoryId }: Props) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const handleOpenAccount = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };
  return (
    <button
      onClick={handleOpenAccount}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 hover:underline",
        !category && "text-rose-500",
      )}
    >
      {!category && <TriangleAlert className="size-4" />}
      {category || "Uncategorized"}
    </button>
  );
}
