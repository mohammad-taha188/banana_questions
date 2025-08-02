import { supabase } from "@/supabase";
import { Montserrat } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
});
const open_sans = Open_Sans({
  subsets: ["latin"],
});

export default async function page({ params }) {
  let id = await params.id[0];

  let { data, error } = await supabase.from("questions").select("*");

  let question = data.filter((q) => {
    return q.id == id;
  });

  const imageArray = JSON.parse(question[0]?.image);

  let dateQuestion = `${new Date(question[0].addTime).getHours()} : ${new Date(
    question[0].addTime
  ).getMinutes()}  ||  ${new Date(question[0].addTime).getMonth()} / ${new Date(
    question[0].addTime
  ).getDay()} / ${new Date(question[0].addTime).getFullYear()}`;

  console.log(question[0].image);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        className={`${montserrat.className} flex justify-between w-full px-2 border border-gray-200 shadow shadow-gray-300 rounded-sm`}
      >
        <h2 className="px-2 py-1 border border-gray-200 shadow shadow-gray-300 rounded-sm my-3">
          {question[0].view ? question[0].view : 0} view
        </h2>
        <h2 className="px-2 py-1 border border-gray-200 shadow shadow-gray-300 rounded-sm my-3 font-bold">
          {question[0].title}
        </h2>
        <h2 className="px-2 py-1 border border-gray-200 shadow shadow-gray-300 rounded-sm my-3">
          {dateQuestion}
        </h2>
      </div>
      {imageArray?.map((img) => {
        return (
          <div
            className="aspect-video w-full overflow-hidden rounded-sm"
            key={question[0].id}
          >
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={img}
              alt={question[0].title}
              className="h-full w-full object-contain object-top group-hover:scale-105 transition-transform duration-300 rounded-sm my-6"
            ></Image>
          </div>
        );
      })}
      <p
        className={`${open_sans.className} px-3 py-2 border border-gray-200 shadow shadow-gray-300 rounded-sm my-6 text-center whitespace-pre-line`}
      >
        {question[0].desc}
      </p>
    </div>
  );
}
