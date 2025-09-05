import NewQuestionC from "@/app/components/NewQuestion";

export function generateMetadata() {
  return {
    title: "new question",
    description: "this is page for add new question.",
    keywords: [
      "banana",
      "banana-questions",
      "banana-question",
      "StackOverflow",
      "question",
      "questions",
    ],
  };
}

export default function newQuestion() {
  return (
    <div className="w-full">
      <NewQuestionC />
    </div>
  );
}
