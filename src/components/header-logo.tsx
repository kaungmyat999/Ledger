import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image src="/logo.svg" width={28} height={28} priority alt="logo" />
        <p className="ml-2.5 text-2xl font-semibold text-white">Ledger</p>
      </div>
    </Link>
  );
}
