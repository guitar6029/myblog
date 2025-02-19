import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-4 bg-neutral-900 gap-2 text-white">
      <div className="flex flex-row items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/about">About</Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link href="/register">Register</Link>
      </div>
    </header>
  );
}
