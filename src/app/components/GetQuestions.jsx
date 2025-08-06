import { supabase } from "@/supabase";
import { Montserrat } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import FilterQuestions from "./FilterQuestions";

const montserrat = Montserrat({
  subsets: ["latin"],
});
const open_sans = Open_Sans({
  subsets: ["latin"],
});

export default async function GetQuestions({ filterValue }) {
  let searchParams = await filterValue;

  let { data, error } = await supabase
    .from("questions")
    .select("*")
    .order(searchParams.filter || "view", {
      ascending: false,
      nullsFirst: false,
    });

  function shortingNumber(num) {
    if (num < 1000) {
      return num;
    }

    const units = ["", "k", "M", "B", "T"]; // هزار، میلیون، میلیارد، تریلیون
    const tier = Math.floor(Math.log10(num) / 3);

    const scaled = num / Math.pow(1000, tier);
    const fixed = scaled.toFixed(scaled < 10 ? 1 : 0); // مثلا 1.2k ولی 12k

    return fixed + units[tier];
  }

  return (
    <div className="w-[90%] flex flex-col items-center justify-center m-0 p-0 gap-7">
      {error && (
        <div className="bg-red-500 text-white px-3 py-2 rounded-sm">
          you have error <br /> {error}
        </div>
      )}

      <FilterQuestions filter={searchParams} />
      {data
        .filter((q) => {
          if (searchParams.search) {
            return q?.title
              ?.toLowerCase()
              .includes(searchParams?.search?.toLowerCase());
          } else {
            return data;
          }
        })
        .map((q) => {
          return (
            <Link href={`/question/${q.id}`} key={q.id} className="w-full">
              <div>
                <div className="border border-gray-200 shadow shadow-gray-500 rounded-sm px-3 py-2 text-center cursor-pointer w-full">
                  <h2
                    className={`${montserrat.className} flex justify-between font-bold`}
                  >
                    <div className="border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 max-h-20 max-w-[50%] overflow-hidden">
                      {q.title}
                    </div>
                    <div className="border border-gray-200  shadow shadow-gray-300 rounded-sm px-3 py-2">
                      {new Date(q.addTime).toLocaleString()}
                    </div>
                  </h2>
                  <br />
                  <div className=" border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 flex justify-between">
                    <h2>
                      {shortingNumber(q.view) ? shortingNumber(q.view) : 0} view
                    </h2>
                    <h2>
                      {shortingNumber(q.disLike)
                        ? shortingNumber(q.disLike)
                        : 0}{" "}
                      disLike
                    </h2>
                    <h2>
                      {shortingNumber(q.like) ? shortingNumber(q.like) : 0} like
                    </h2>
                  </div>
                  <br />
                  <div
                    className={`${open_sans.className} border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 overflow-hidden max-h-15 text-center whitespace-pre-line `}
                  >
                    {q.desc}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
