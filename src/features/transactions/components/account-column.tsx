import { useOpenAccount } from "../../accounts/state/use-open-account";

type Props = {
  account: string;
  accountId: string | null;
};

export default function AccountColumn({ account, accountId }: Props) {
  const { onOpen: onOpenAccount } = useOpenAccount();
  const handleOpenAccount = () => {
    if (accountId) onOpenAccount(accountId);
  };
  return (
    <button
      onClick={handleOpenAccount}
      className="flex cursor-pointer items-center justify-center hover:underline"
    >
      {account}
    </button>
  );
}
