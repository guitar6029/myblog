import Link from "next/link"

export default function Header() {
    return (
        <header className="flex flex-row items-center p-4 bg-neutral-900 gap-2 text-white">
            <div>
                <span>Blog</span>
            </div>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/about">About</Link>
        </header>
    )
}