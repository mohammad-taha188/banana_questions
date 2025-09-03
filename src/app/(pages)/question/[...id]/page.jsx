import GetID from "@/app/components/GetID";
import Like from "@/app/components/Like";
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

export async function generateMetadata({ params }) {
  const awaitedParams = await params; // اینو await کن
  const id = awaitedParams.id[0]; // حالا id رو بدون await بردار

  let { data, error } = await supabase.from("questions").select("*");

  let question = data.filter((q) => {
    return q.question_id == id;
  });

  return { title: question[0].title, description: question[0].desc };
}

export default async function page({ params }) {
  const awaitedParams = await params; // اینو await کن
  const id = awaitedParams.id[0]; // حالا id رو بدون await بردار
  const userId = await GetID();

  let { data, error } = await supabase.from("questions").select("*");

  let question = data.filter((q) => {
    return q.question_id == id;
  });

  const imageArray = question[0]?.image ? JSON?.parse(question[0].image) : null;

  let dateQuestion = `${new Date(question[0].addTime).getHours()} : ${new Date(
    question[0].addTime
  ).getMinutes()}  ||  ${new Date(question[0].addTime).getMonth()} / ${new Date(
    question[0].addTime
  ).getDay()} / ${new Date(question[0].addTime).getFullYear()}`;

  //

  async function viewIncreaser() {
    let newView = { userId: userId.userId };
    let views = [...question[0].view, newView];

    if (question[0].view.length == 0) {
      //
      console.log(newView);

      let arrayNewView = [newView];

      let { error: viewError } = await supabase
        .from("questions")
        .update({ view: arrayNewView })
        .eq("question_id", question[0].question_id);
    } else {
      if (
        question[0].view
          .map((view) => view.userId)
          .filter((views) => views == userId.userId).length == 0
      ) {
        let { error: viewError } = await supabase
          .from("questions")
          .update({ view: views })
          .eq("question_id", question[0].question_id);
      } else {
        console.log("your viewed");
      }
    }
  }
  viewIncreaser();
  //

  const usersIdVoted = question[0]?.votes?.map((v) => v.userId);

  const voteIndex = usersIdVoted?.findIndex((vote) => vote == userId?.userId);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        className={` font-semibold flex justify-between gap-1.5 w-full px-2 border border-gray-200 shadow shadow-gray-300 rounded-sm`}
      >
        <h2 className="px-2 py-1 border border-gray-200 shadow shadow-gray-300 rounded-sm my-3">
          {question[0].view.length ? question[0].view.length : 0} view
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
            key={question[0].question_id}
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

      <Like
        vote={
          voteIndex !== -1
            ? question[0].votes?.map((v) => v.type)[voteIndex]
            : null
        }
        questionID={question[0].question_id}
      />
    </div>
  );
}
