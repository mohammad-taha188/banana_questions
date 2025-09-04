import { supabase } from "@/supabase";
import Link from "next/link";
import FilterQuestions from "./FilterQuestions";

export default async function GetQuestions({ filterValue }) {
  let searchParams = await filterValue;

  let { data, error } = await supabase
    .from("questions")
    .select("*")
    .order(searchParams.filter || "view", {
      ascending: false,
      nullsFirst: false,
    });

  let { data: users, error: userError } = await supabase
    .from("users")
    .select("*");
  if (userError) {
    Error();
  }
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
    <div className="w-[90%] flex flex-col items-center justify-center m-0 p-0 gap-7 my-6">
      {error && (
        <div className="bg-red-500 text-white px-3 py-2 rounded-sm">
          you have error <br /> {JSON.stringify(error)}
        </div>
      )}

      <FilterQuestions filter={searchParams} />

      {console.log(data)}

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
          let userName = users.filter((user) => user.id == q?.userID);
          return (
            <Link
              href={`/question/${q?.question_id}`}
              key={q.question_id}
              className="w-full"
            >
              <div>
                <div className="border border-gray-200 shadow shadow-gray-500 rounded-sm px-3 py-2 text-center cursor-pointer w-full">
                  <h2 className={`font-semibold flex justify-between `}>
                    <div className="border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 max-h-17 max-w-[50%] overflow-hidden">
                      {q.title}
                    </div>
                    <div className="border border-gray-200  shadow shadow-gray-300 rounded-sm px-3 py-2">
                      {new Date(q?.addTime).toLocaleString()}
                    </div>
                  </h2>
                  <br />

                  <h2 className={`font-semibold flex justify-between `}>
                    <div className="border border-gray-200  shadow shadow-gray-300 rounded-sm px-3 py-2 m-auto">
                      {userName[0]?.name || "unknown"}
                    </div>
                  </h2>

                  <br />
                  <div className=" border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 flex justify-between">
                    <h2 className="font-thin">
                      {shortingNumber(q?.view.length)
                        ? shortingNumber(q?.view.length)
                        : 0}{" "}
                      view
                    </h2>

                    <h2 className="font-thin">
                      {shortingNumber(
                        q?.votes
                          ?.map((v) => v.type)
                          .filter((type) => type == "disLike").length
                      )
                        ? shortingNumber(
                            q?.votes
                              ?.map((v) => v.type)
                              .filter((type) => type == "disLike").length
                          )
                        : 0}{" "}
                      disLike
                    </h2>
                    <h2 className="font-thin">
                      {shortingNumber(
                        q?.votes
                          ?.map((v) => v.type)
                          .filter((type) => type == "like").length
                      )
                        ? shortingNumber(
                            q?.votes
                              ?.map((v) => v.type)
                              .filter((type) => type == "like").length
                          )
                        : 0}{" "}
                      like
                    </h2>
                  </div>
                  <br />
                  <p
                    className={` border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 overflow-hidden max-h-15 text-center whitespace-pre-line `}
                  >
                    {q?.desc}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
