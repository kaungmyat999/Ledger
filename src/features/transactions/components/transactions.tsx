"use client";
import { DataTable } from "@/src/components/data-table";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { transactions as transactionsSchema } from "@/src/db/schema";
import useSelectAccount from "@/src/features/accounts/hooks/use-select-account";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SelectAccountDialog from "../../accounts/components/select-account-dialog";
import { useBulkCreateTransactions } from "../api/use-bulk-create-transactions";
import { useBulkDeleteTransactions } from "../api/use-bulk-delete-transactions";
import { useGetTransactions } from "../api/use-get-transactions";
import { useNewTransaction } from "../state/use-new-transaction";
import ImportCard from "./import-card";
import { transactionsColumns } from "./transactions-columns";
import UploadButton from "./upload-button";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function Transactions() {
  const selectAccountProps = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const { onOpen } = useNewTransaction();
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useGetTransactions();

  const { mutate: deleteTransactions, isPending: isDeletingTransactions } =
    useBulkDeleteTransactions();
  const { mutate: createTransactions, isPending: isCreatingTransactions } =
    useBulkCreateTransactions();
  const isDisabled =
    isLoadingTransactions || isDeletingTransactions || isCreatingTransactions;

  const onSubmitImport = async (
    values: (typeof transactionsSchema.$inferInsert)[],
  ) => {
    const accountId = await selectAccountProps.confirm();
    if (!accountId) return toast.error("Please select an account to continue.");
    const data = values.map((value) => ({
      ...value,
      accountId: accountId,
    }));
    createTransactions(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (isLoadingTransactions) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-xs">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-50 w-full items-center justify-center">
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <SelectAccountDialog selectAccountProps={selectAccountProps} />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-xs">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Transactions History
          </CardTitle>
          <div className="flex flex-col gap-2 self-stretch lg:flex-row lg:items-center">
            <Button size={"sm"} onClick={onOpen}>
              <Plus className="size-4" />
              <span>Add New</span>
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions({ ids });
            }}
            confirmOptions={{
              title: "Are you sure?",
              message: "You are about to delete this transaction(s).",
            }}
            columns={transactionsColumns}
            data={transactions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
