import "./globals.css";
import { Ubuntu } from "next/font/google";
import { SectionContextProvider } from "@/context/SectionContext";

export const metadata = {
  title: "Fractal",
  description: "University preparation with a tailor-made study plan for you",
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-fgray-200 ${ubuntu.variable}`}>
        <SectionContextProvider>{children}</SectionContextProvider>
      </body>
    </html>
  );
}
