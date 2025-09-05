import Sign_upC from "@/app/components/Sign-upC";

export async function generateMetadata() {
  return {
    title: "sign-up",
    description: "sign-up page",
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

export default function Sign_up() {
  return (
    <div className="w-full">
      <Sign_upC />
    </div>
  );
}
