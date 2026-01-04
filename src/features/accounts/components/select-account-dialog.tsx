import { Select } from "@/src/components/select";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { RefObject } from "react";

type Props = {
  selectAccountProps: {
    promise: ((value: string | undefined) => void) | null;
    accountOptions: { label: string; value: string }[];
    onCreateAccount: (name: string) => void;
    selectValue: RefObject<string | undefined>;
    disabled: boolean;
    handleCancel: () => void;
    handleConfirm: () => void;
  };
};

export default function SelectAccountDialog({ selectAccountProps }: Props) {
  const {
    promise,
    accountOptions,
    onCreateAccount,
    selectValue,
    disabled,
    handleCancel,
    handleConfirm,
  } = selectAccountProps;
  return (
    <Dialog open={!!promise}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please Select an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          // onChange={(value) => (setSelectVal(value))}
          disabled={disabled}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant={"destructive"}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
