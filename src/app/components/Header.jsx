import Link from "next/link";

export default function Header() {
  return (
    <div
      className={`flex justify-between items-center border border-gray-300 rounded-sm shadow shadow-gray-200 px-4 py-1 my-3`}
    >
      <div className=" text-2xl select-none cursor-pointer">
        <Link href={`/`}>🍌</Link>
      </div>
      <div className="">
        <Link href={`/`}>new</Link>
      </div>
    </div>
  );
}
