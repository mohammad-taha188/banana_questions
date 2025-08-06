import Link from "next/link";

export default function Header() {
  let links = [
    { name: "home", url: "/ " },
    { name: "new", url: "new-question" },
    { name: "login", url: "login" },
  ];
  return (
    <div
      className={`flex justify-between items-center border border-gray-300 rounded-sm shadow shadow-gray-200 px-4 py-1 my-3 w-full`}
    >
      <div className=" text-2xl select-none cursor-pointer">
        <Link href={`/`}>🍌</Link>
      </div>
      <div className="flex gap-5">
        {links.map((link) => {
          return (
            <Link href={link.url} key={link.name}>
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
