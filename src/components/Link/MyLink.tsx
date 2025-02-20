import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = {
  linkPath: string;
  text: string;
};

export default function MyLink({ linkPath, text }: LinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={linkPath}
      className={`link-text ${pathname === linkPath ? "active" : ""}`}
    >
      {text}
    </Link>
  );
}
