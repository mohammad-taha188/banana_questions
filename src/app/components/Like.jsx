"use client";

import { supabase } from "@/supabase";
import { useEffect, useRef, useState } from "react";
import GetID from "./GetID";

export default function Like({ vote, questionID }) {
  const [isLike, setIsLike] = useState();
  const [isDisLike, setIsDisLike] = useState();
  const [userError, setUserError] = useState();
  const [questionsError, setQuestionsError] = useState();
  const [firstLogin, setFirstLogin] = useState(false);
  const [user, setUser] = useState();
  const [question, setQuestion] = useState();
  const [ID, setID] = useState();

  useEffect(() => {
    async function getId() {
      const id = await GetID();

      setID(id?.userId);
    }
    getId();

    if (vote == "disLike") {
      setIsDisLike(true);
      setIsLike(false);
    } else if (vote == "like") {
      setIsLike(true);
      setIsDisLike(false);
    }
  }, []);

  useEffect(() => {
    async function getUsers() {
      const id = await GetID();

      if (id?.userId) {
        const { data: thisUser, error: errorUsers } = await supabase
          .from("users")
          .select("*")
          .eq("userId", id?.userId);

        if (errorUsers) {
          setUserError(errorUsers);
        } else {
          setUser(thisUser);
        }

        async function getQuestions() {
          const { data: thisQuestion, error: questionsError } = await supabase
            .from("questions")
            .select("*")
            .eq("question_id", questionID);

          setQuestion(thisQuestion);
          setQuestionsError(questionsError);
        }
        getQuestions();
      }
    }
    getUsers();
  }, []);

  if (ID && user) {
    async function voting(e) {
      //
      console.log(user);
      const voteObject = {
        userId: user[0].userId,
        questionID: questionID,
        type: e,
      };
      const arrayVotes = [voteObject];
      // console.log(question[0].votes);
      if (!question[0]?.votes) {
        //
        const { error: errorFetchVote } = await supabase
          .from("questions")
          .update({ votes: arrayVotes })
          .eq("question_id", questionID);

        setQuestionsError(errorFetchVote);
      } else {
        const questionVote = question[0].votes;

        const id = await GetID();

        let userVotes = questionVote.filter((vote) => vote.userId == id.userId);

        console.log(e);
        console.log(userVotes);

        //
        if (userVotes.length == 0) {
          //

          const prevVotes = question[0].votes;

          prevVotes.push(voteObject);

          const { error: errorFetchVote } = await supabase
            .from("questions")
            .update({ votes: prevVotes })
            .eq("question_id", questionID);

          setQuestion([{ ...question[0], votes: prevVotes }]);

          console.log(question);

          setQuestionsError(errorFetchVote);
        } else {
          if (userVotes[0].type !== e) {
            //
            let changedType = {
              userId: id.userId,
              questionID: questionID,
              type: e,
            };

            const removedVote = questionVote.filter(
              (vote) => vote.userId !== id.userId
            );

            removedVote.push(changedType);

            const { error: errorFetchVote } = await supabase
              .from("questions")
              .update({ votes: removedVote })
              .eq("question_id", questionID);

            setQuestion([{ ...question[0], votes: removedVote }]);
            setQuestionsError(errorFetchVote);
          } else {
            const removedVote = questionVote.filter(
              (vote) => vote.userId !== id.userId
            );

            const { error: errorFetchVote } = await supabase
              .from("questions")
              .update({ votes: removedVote })
              .eq("question_id", questionID);
            setQuestionsError(errorFetchVote);
          }
        }
      }
    }

    return (
      <div className="flex flex-col gap-6 items-center">
        <div className="flex border border-gray-200 shadow shadow-gray-300 rounded-sm px-2 py-1 gap-5 justify-between">
          <img
            src={!isLike ? "/like.svg" : "/like-full.svg"}
            alt="like"
            className="w-7 h-7 cursor-pointer"
            id="like"
            onClick={(e) => {
              setIsLike(!isLike);
              setIsDisLike(false);
              voting(e.target.id);
            }}
          />

          <div className="w-px bg-gray-200"></div>

          <img
            src={!isDisLike ? "/disLike.svg" : "/dislike-full.svg"}
            alt="disLike"
            className="w-7 h-7 cursor-pointer"
            id="disLike"
            onClick={(e) => {
              setIsDisLike(!isDisLike);
              setIsLike(false);
              voting(e.target.id);
            }}
          />
        </div>
      </div>
    );
  } else {
    return <p className="text-red-400">please first login or wait.</p>;
  }
}
