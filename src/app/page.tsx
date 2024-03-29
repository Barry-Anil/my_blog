import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="text-gray-600 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
              Share your Story With The World
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
              "Empower your voice, share your story – all at your fingertips."
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/create">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
            <Image
              className="md:ml-1 ml-24"
              alt="gif"
              src="/images/image.gif"
              width={300}
              height={300}
            />
          </div>
        </div>
        <section className="mx-auto">
          <div className="container px-5 mx-auto lg:px-24 ">
            <div className="flex flex-col w-full mb-4 text-left lg:text-center">
              <h1 className="mb-8 text-2xl Avenir font-semibold text-black">
                Category
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-16 mb-16 text-center lg:grid-cols-4">
              <div className="flex items-center justify-center">
                a
              </div>
              <div className="flex items-center justify-center">
                b
              </div>
              <div className="flex items-center justify-center">
                c
              </div>
              <div className="flex items-center justify-center">
                d
              </div>
            </div>
          </div>
        </section>
        {/* <div className="grr max-w-7xl pt-20 mx-auto text-center">
          <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">
            Less code, less effort.
          </h1>
          <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600 text-center">
            Minify your CSS with Tailwind's built in PostCSS support.
          </h1>
          <div className="container flex flex-col items-center justify-center mx-auto rounded-lg ">
            <img
              className="object-cover object-center w-3/4 mb-10 g327 border rounded-lg shadow-md"
              alt="Placeholder Image"
              src="./images/placeholder.png"
            ></img>
          </div>
        </div> */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
                Subscribe to us
              </h1>
              <h1 className="mb-9 text-2xl font-semibold text-gray-600">
                Enter your email address.
              </h1>
              <input
                placeholder="jack@example.com"
                name="email"
                type="email"
                autoComplete="email"
                className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
              ></input>{" "}
              <Link
                className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="/"
              >
                <p className="justify-center">Subscribe</p>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
