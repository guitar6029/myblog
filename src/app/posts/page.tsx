import Link from "next/link";

export default function Posts() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1>Posts</h1>
        <Link href="/posts/create">+ New Post</Link>
      </div>
    </div>
  );
}
