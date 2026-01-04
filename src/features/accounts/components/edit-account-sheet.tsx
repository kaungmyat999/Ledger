import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { insertAccountSchema } from "@/src/db/schema";
import useConfirm from "@/src/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useDeleteAccount } from "../api/use-delete-account";
import { useEditAccount } from "../api/use-edit-account";
import { useGetAccount } from "../api/use-get-account";
import { useOpenAccount } from "../state/use-open-account";
import AccountForm from "./account-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm();
  const { data: account, isLoading } = useGetAccount(id);
  const { mutate: updateAccount, isPending: isUpdating } = useEditAccount(id);
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount(id);
  const defaultValues = account ? { name: account.name } : { name: "" };
  const isPending = isUpdating || isDeleting;

  const onSubmit = (values: FormValues) => {
    updateAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm({
      title: "Are You Sure?",
      message: "You are about deleting this account.",
    });
    if (ok) {
      deleteAccount(undefined, {
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="text-muted-foreground size-8 animate-spin" />
            </div>
          ) : (
            <AccountForm
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
