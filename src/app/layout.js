import "./globals.css";
import { Ubuntu } from 'next/font/google'

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// font config

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"]
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-fgray-200 ${ubuntu.variable}`}>
        {children}
      </body>
    </html>
  );
}
