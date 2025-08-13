import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "banana question",
  description: "if you have question, you can come here",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="px-4">
          <Header />
        </div>
        <div className={`px-15 flex items-center flex-col`}>{children}</div>
      </body>
    </html>
  );
}
