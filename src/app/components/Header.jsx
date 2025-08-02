import Link from "next/link";

export default function Header() {
  return (
    <div
      className={`flex justify-between items-center border border-gray-300 rounded-sm shadow shadow-gray-200 px-4 py-1 my-3 w-full`}
    >
      <div className=" text-2xl select-none cursor-pointer">
        <Link href={`/`}>🍌</Link>
      </div>
      <div className="">
        <Link href={`/new-question`}>new</Link>
      </div>
    </div>
  );
}
