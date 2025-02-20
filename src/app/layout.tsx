import Header from "@/components/Header/Header";
import "./globals.scss";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "The Riff Cult",
  description: "The most popular and awsome riff blog in the world",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className="h-full">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
