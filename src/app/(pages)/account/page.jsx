import Logout from "@/app/components/Logout";
import { supabase } from "@/supabase";
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Error from "@/app/error";

export function generateMetadata() {
  return { title: "account", description: "your account page!" };
}

export default async function account() {
  let cookie = await cookies();
  let { data, error: errorUser } = await supabase.from("users").select("*");

  let { data: questions, error: errorQuestions } = await supabase
    .from("questions")
    .select("*");

  let isLogin = cookie.get("session");

  let key = process.env.JWT_KEY;

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

  if (isLogin) {
    let ID = jwt.verify(isLogin?.value, key);
    let user = data.filter((u) => {
      return u.userId == ID.userId;
    });

    let userQuestions = questions.filter(
      (question) => question.userID == user[0].userId
    );

    if (user[0]) {
      return (
        <div className="mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Profile
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">User Name:</span> {user[0]?.name}
            </p>

            <p>
              <span className="font-semibold">Email:</span> {user[0]?.email}
            </p>
            <p>
              <span className="font-semibold">Join Date:</span>{" "}
              {new Date(user[0]?.date_add).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <p>
              <span className="font-semibold">Your ID:</span> {user[0]?.userId}
            </p>
          </div>

          <div className="mt-6">
            <Logout />
          </div>
          <br />
          <h2 className="font-semibold text-center">your questions</h2>

          <details className="w-full text-center select-none border border-gray-200 shadow shadow-gray-100 rounded-sm py-2 my-2">
            <summary></summary>
            <div className="w-full flex flex-col gap-3 items-center">
              {userQuestions.map((userQuestion) => {
                return (
                  <Link
                    href={`/question/${userQuestion.question_id}`}
                    key={userQuestion.question_id}
                    className="w-[80%] my-5"
                  >
                    <div className="">
                      <div className="border border-gray-200 shadow shadow-gray-500 rounded-sm px-3 py-2 text-center cursor-pointer w-full">
                        <h2 className={` flex justify-between`}>
                          <p className="border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 max-h-17 max-w-[50%] overflow-hidden  font-semibold">
                            {userQuestion.title}
                          </p>
                          <p className="border border-gray-200 font-semibold shadow shadow-gray-300 rounded-sm px-3 py-2">
                            {new Date(userQuestion.addTime).toLocaleString()}
                          </p>
                        </h2>
                        <br />

                        <div className=" border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 flex justify-between">
                          <h2 className="font-thin">
                            {shortingNumber(userQuestion?.view)
                              ? shortingNumber(userQuestion?.view)
                              : 0}{" "}
                            view
                          </h2>

                          <h2 className="font-thin">
                            {shortingNumber(
                              userQuestion?.votes
                                ?.map((v) => v.type)
                                .filter((type) => type == "disLike").length
                            )
                              ? shortingNumber(
                                  userQuestion?.votes
                                    ?.map((v) => v.type)
                                    .filter((type) => type == "disLike").length
                                )
                              : 0}{" "}
                            disLike
                          </h2>
                          <h2 className="font-thin">
                            {shortingNumber(
                              userQuestion?.votes
                                ?.map((v) => v.type)
                                .filter((type) => type == "like").length
                            )
                              ? shortingNumber(
                                  userQuestion?.votes
                                    ?.map((v) => v.type)
                                    .filter((type) => type == "like").length
                                )
                              : 0}{" "}
                            like
                          </h2>
                        </div>
                        <br />
                        <div
                          className={` border border-gray-200 shadow shadow-gray-300 rounded-sm px-3 py-2 overflow-hidden max-h-15 text-center whitespace-pre-line `}
                        >
                          {userQuestion.desc}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </details>
        </div>
      );
    } else {
      return <Error />;
    }
  } else {
    return (
      <div className="flex justify-center items-center flex-col gap-12">
        <h2>please first login</h2>
        <Link
          href={"/login"}
          className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-5 rounded-sm hover:shadow active:shadow-gray-500 outline-0"
        >
          Login
        </Link>
      </div>
    );
  }
}
