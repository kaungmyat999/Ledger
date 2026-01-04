import { RefObject, useRef, useState } from "react";
import { useCreateAccount } from "../api/use-create-account";
import { useGetAccounts } from "../api/use-get-accounts";

type ReturnType = {
  promise: ((value: string | undefined) => void) | null;
  accountOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  confirm: () => Promise<string>;
  selectValue: RefObject<string | undefined>;
  handleCancel: () => void;
  handleConfirm: () => void;
  disabled: boolean;
};

export default function useSelectAccount(): ReturnType {
  const { data: accounts = [], isLoading } = useGetAccounts();
  const { mutate: createAccount, isPending } = useCreateAccount();
  const onCreateAccount = (name: string) => createAccount({ name });
  const accountOptions = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<
    ((value: string | undefined) => void) | null
  >(null);
  const selectValue = useRef<string | undefined>(undefined);
  // const [selectVal, setSelectVal] = useState<string | undefined>(undefined);

  function confirm() {
    return new Promise<string>((resolve) => {
      setPromise(() => resolve);
    });
  }
  function handleClose() {
    setPromise(null);
  }
  function handleConfirm() {
    promise?.(selectValue.current);
    // promise?.(selectVal);
    handleClose();
  }

  function handleCancel() {
    promise?.(undefined);
    handleClose();
  }

  return {
    promise,
    accountOptions,
    selectValue,
    confirm,
    onCreateAccount,
    handleCancel,
    handleConfirm,
    disabled: isLoading || isPending,
  };
}
