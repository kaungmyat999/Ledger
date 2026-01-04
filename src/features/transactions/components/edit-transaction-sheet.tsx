import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { insertTransactionSchema } from "@/src/db/schema";
import useConfirm from "@/src/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useCreateAccount } from "../../accounts/api/use-create-account";
import { useGetAccounts } from "../../accounts/api/use-get-accounts";
import { useCreateCategory } from "../../categories/api/use-create-category";
import { useGetCategoris } from "../../categories/api/use-get-categories";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useOpenTransaction } from "../state/use-open-transaction";
import TransactionForm from "./transaction-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm();
  const { data: transaction, isLoading: isLoadingTransactions } =
    useGetTransaction(id);
  const { mutate: updateTransaction, isPending: isUpdatingTransaction } =
    useEditTransaction(id);
  const { mutate: deleteTransaction, isPending: isDeletingTransaction } =
    useDeleteTransaction(id);

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoris();
  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory();
  const onCreateCategory = (name: string) => {
    createCategory({ name });
  };
  const categoryOptions = (categories ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { mutate: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();
  const onCreateAccount = (name: string) => {
    createAccount({ name });
  };
  const accountOptions = (accounts ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));
  const isPending =
    isLoadingTransactions ||
    isCreatingCategory ||
    isCreatingAccount ||
    isUpdatingTransaction ||
    isDeletingTransaction;

  const isLoading =
    isLoadingTransactions || isLoadingCategories || isLoadingAccounts;

  const defaultValues = transaction
    ? {
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
        amount: transaction.amount.toString(),
        date: transaction.date ? new Date(transaction.date) : new Date(),
        payee: transaction.payee,
        notes: transaction.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };
  const onSubmit = (values: FormValues) => {
    updateTransaction(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm({
      title: "Are You Sure?",
      message: "You are about deleting this transaction.",
    });
    if (ok) {
      deleteTransaction(undefined, {
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
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="text-muted-foreground size-8 animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
