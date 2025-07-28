import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "banana question",
  description: "if you have question, you can come here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`container`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
