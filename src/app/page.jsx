import Link from "next/link";
import GetID from "./components/GetID";
import GetQuestions from "./components/GetQuestions";
import SearchQuestions from "./components/SearchQuestions";
import Login from "./(pages)/login/page";

export default async function Home({ searchParams }) {
  let filterValue = await searchParams;

  let isLogin = await GetID();

  if (isLogin?.userId) {
    return (
      <div className="w-full flex items-center flex-col">
        <SearchQuestions />
        <GetQuestions filterValue={filterValue} />
      </div>
    );
  } else {
    return <Login />;
  }
}
