import { unstable_getServerSession } from "next-auth/next";
import "../styles/globals.css";

// components
import HeaderComp from "./Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <HeaderComp />
        {children}
      </body>
    </html>
  );
}
