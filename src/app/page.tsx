import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center font-bold">My app</h1>
      <div className="flex justify-center">
        <Link href="/recipes">
          <button className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400">
            recipes-app
          </button>
        </Link>
      </div>
    </>
  );
}
