import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-lg w-screen h-screen flex flex-col items-center justify-center">
      <div>
        Todo Application
      </div>
      <Link className="border p-2 m-1" href="/signup">Sign up to Todo App</Link>
      <Link className="border p-2 m-1" href="/signin">Sign in to Todo App</Link>
    </div>
  );
}
