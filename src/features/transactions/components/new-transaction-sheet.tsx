import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { insertTransactionSchema } from "@/src/db/schema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useCreateAccount } from "../../accounts/api/use-create-account";
import { useGetAccounts } from "../../accounts/api/use-get-accounts";
import { useCreateCategory } from "../../categories/api/use-create-category";
import { useGetCategoris } from "../../categories/api/use-get-categories";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useNewTransaction } from "../state/use-new-transaction";
import TransactionForm from "./transaction-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const { mutate: createTransaction, isPending: isCreatingTransaction } =
    useCreateTransaction();

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
    isCreatingTransaction || isCreatingCategory || isCreatingAccount;
  const isLoading = isLoadingCategories || isLoadingAccounts;

  const onSubmit = (values: FormValues) => {
    createTransaction(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new transaction.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="text-muted-foreground size-8 animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
