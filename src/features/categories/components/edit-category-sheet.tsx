import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { insertCategorySchema } from "@/src/db/schema";
import useConfirm from "@/src/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useDeleteCategory } from "../api/use-delete-category";
import { useEditCategory } from "../api/use-edit-category";
import { useGetCategory } from "../api/use-get-category";
import { useOpenCategory } from "../state/use-open-category";
import CategoryForm from "./category-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm();
  const { data: category, isLoading } = useGetCategory(id);
  const { mutate: updateCategory, isPending: isUpdating } = useEditCategory(id);
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategory(id);
  const defaultValues = category ? { name: category.name } : { name: "" };
  const isPending = isUpdating || isDeleting;

  const onSubmit = (values: FormValues) => {
    updateCategory(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm({
      title: "Are You Sure?",
      message: "You are about deleting this category.",
    });
    if (ok) {
      deleteCategory(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="text-muted-foreground size-8 animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
