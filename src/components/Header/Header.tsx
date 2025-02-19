import Link from "next/link"

export default function Header() {
    return (
        <header className="flex flex-row items-center p-4 bg-blue-200 gap-2 ">
            <div>
                <span>Blog</span>
            </div>
            <Link href="/posts">Posts</Link>
            <Link href="/about">About</Link>
        </header>
    )
}