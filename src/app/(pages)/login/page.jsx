import LoginC from "@/app/components/LoginC";

export async function generateMetadata() {
  return {
    title: "login",
    description: "this is page for login.",
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

export default async function Login() {
  return (
    <div className="w-full">
      <LoginC />
    </div>
  );
}
