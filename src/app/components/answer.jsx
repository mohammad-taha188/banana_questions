"use client";

import { useEffect, useRef, useState } from "react";
import GetID from "./GetID";
import { supabase } from "@/supabase";

function Answer({ questionID }) {
  const [value, setValue] = useState();
  const [ID, setID] = useState();
  const [clicked, setClicked] = useState(false);
  let input = useRef(null);
  useEffect(() => {
    async function gaetId() {
      let id = await GetID();
      setID(id.userId);
    }
    gaetId();
  }, []);

  return (
    <div className="flex gap-4 flex-col my-16 w-full items-center justify-center">
      <textarea
        type="text"
        placeholder="your answer"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="border border-gray-300 h-[200px] shadow shadow-gray-200 focus:outline outline-gray-300 px-2 rounded-sm w-[80%] py-1"
        ref={input}
      ></textarea>
      <button
        className="btn btn-yellow cursor-pointer"
        onClick={async () => {
          let newAnswer = {
            userId: ID,
            answer: value,
            date: new Date().getTime(),
            isUpdated: false,
          };

          let { data, error } = await supabase
            .from("questions")
            .select("*")
            .eq("question_id", questionID);
          if (error) {
            Error();
          }
          if (!clicked) {
            if (input.current.value != "") {
              setClicked(true);
              if (data[0].answer.length == 0) {
                let arrayAnswer = [newAnswer];

                let { error } = await supabase
                  .from("questions")
                  .update({ answer: arrayAnswer })
                  .eq("question_id", questionID);

                if (error) {
                  Error();
                }
                if (!error) input.current.value = "";
              } else {
                let prevAnswer = data[0].answer;
                prevAnswer.push(newAnswer);

                let { error } = await supabase
                  .from("questions")
                  .update({ answer: prevAnswer })
                  .eq("question_id", questionID);
                if (error) {
                  Error();
                }

                if (!error) input.current.value = "";
              }
            } else {
              console.log("please coplete input");
            }
          }
        }}
      >
        post
      </button>
    </div>
  );
}

export default Answer;
