import { supabase } from "@/supabase";
import { Montserrat } from "next/font/google";
import { Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});
const open_sans = Open_Sans({
  subsets: ["latin"],
});

export default async function GetQuestions() {
  let { data, error } = await supabase.from("questions").select("*");

  return (
    <div>
      {error && (
        <div className="bg-red-500 text-white px-3 py-2 rounded-sm">
          you have error <br /> {error}
        </div>
      )}
      {data.map((q) => {
        return (
          <div className="" key={q.id}>
            <div className="border-b-gray-300 shadow shadow-gray-400 rounded-sm px-3 py-2 text-center my-7 cursor-pointer">
              <h2 className={`${montserrat.className} flex justify-between`}>
                <div className="border-b-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2">
                  {" "}
                  {q.title}
                </div>
                <div className="border-b-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2">
                  {new Date(q.addTime).toLocaleString()}
                </div>
              </h2>
              <br />
              <p
                className={`${open_sans.className} border-b-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 overflow-hidden max-h-15 flex`}
              >
                {q.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
