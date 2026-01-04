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
import { Loader2, Plus } from "lucide-react";
import { useBulkDeleteCategories } from "../api/use-bulk-delete-categories";
import { useGetCategoris } from "../api/use-get-categories";
import { useNewCategory } from "../state/use-new-category";
import { categoriesColumns } from "./categories-columns";

export default function Categories() {
  const { onOpen } = useNewCategory();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoris();

  const { mutate: deleteCategories, isPending: isDeletingCategories } =
    useBulkDeleteCategories();
  const isDisabled = isLoadingCategories || isDeletingCategories;

  if (isLoadingCategories)
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

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-xs">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Categories page
          </CardTitle>
          <Button onClick={onOpen} className="self-stretch lg:self-auto">
            <Plus className="size-4" />
            <span>Add New</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories({ ids });
            }}
            confirmOptions={{
              title: "Are You Sure?",
              message: "You are about to delete this category.",
            }}
            columns={categoriesColumns}
            data={categories}
          />
        </CardContent>
      </Card>
    </div>
  );
}
