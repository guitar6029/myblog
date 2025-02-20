import Link from "next/link";
import localFont from 'next/font/local';

const myFont = localFont({src: '../../fonts/Farwrith.ttf'});

export default function Header() {
  return (
    <header className={`${myFont.className} flex flex-row justify-between items-center p-4 bg-neutral-900 gap-2 text-white`}>
      <div className="flex flex-row items-center gap-4">
        <Link href="/" className="link-text">Home</Link>
        <Link href="/dashboard" className="link-text">Dashboard</Link>
        <Link href="/posts" className="link-text">Posts</Link>
        <Link href="/about" className="link-text">About</Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link href="/register">Register</Link>
      </div>
    </header>
  );
}
