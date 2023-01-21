import Head from "next/head";
import { Inter } from "@next/font/google";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Job Description Generator</title>
        <meta name="description" content="AI Job Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-white min-h-screen "}>
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold">
          Yapay Zeka İş Tanımı Oluşturucu
            <span className="text-4xl md:text-6xl font-bold text-blue-600">
              .
            </span>
          </h1>
          <p className="mt-3 text-2xl">
            Saniyeler İçerisinde
            <span className="text-2xl font-bold text-blue-600">
              {" "}
              Mükemmel İş Tanımları{" "}
            </span>
            Oluşturun
          </p>
        </div>
        <Dashboard />
      </main>
    </>
  );
}