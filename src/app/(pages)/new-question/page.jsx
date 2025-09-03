import NewQuestionC from "@/app/components/NewQuestion";

export function generateMetadata() {
  return {
    title: "add new questions",
    description: "this is page for add new questions.",
  };
}

export default function newQuestion() {
  return (
    <div className="w-full">
      <NewQuestionC />
    </div>
  );
}
