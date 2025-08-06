import GetQuestions from "./components/GetQuestions";
import SearchQuestions from "./components/SearchQuestions";

export default async function Home({ searchParams }) {
  let filterValue = await searchParams;

  return (
    <div className="w-full flex items-center flex-col">
      <SearchQuestions />
      <GetQuestions filterValue={filterValue} />
    </div>
  );
}
