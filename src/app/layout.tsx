import Header from "@/components/Header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>
        {children}

        </main>
        {/* <Footer /> */}
        </body>
    </html>
  );
}
