import ForgetPasswordC from "@/app/components/Forget-passwordC";

export async function generateMetadata() {
  return {
    title: "forget passowrd",
    description: "forget passowrd page",
    keywords: [
      "banana",
      "banana-questions",
      "banana-question",
      "StackOverflow",
      "question",
      "questions",
      "sing-up",
    ],
  };
}

export default function forgetPassword() {
  return (
    <div className="w-full">
      <ForgetPasswordC />
    </div>
  );
}
