"use client";
// TODO: #2 Make button a seperate component so that it will be the client component and the rest of the home page will be a server component.

import { useRouter } from "next/navigation";

/**
 * A Next.js page that displays the home page of the Laptop Price Gauge application.
 *
 * The page displays a heading, a paragraph of text describing the purpose of the application,
 * and a button that takes the user to the form page.
 *
 * @returns {JSX.Element} A JSX element representing the page.
 */
export default function Home() {
  const router = useRouter();

  function formRedirect() {
    router.push('/form')
  }
  return (
    <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
      <h1 className="text-3xl font-bold">Laptop Price Gauge</h1>
      <p className="text-center">
        Welcome to the Laptop Price Gauge! Here you can see the overall value of
        the laptop you are looking at based on the components of the laptop, and compare
        it with the prices that have been provided to you from retailers.
        <br />
        The goal of this application is to help you decide which laptop has the most value,
        and give you more information when looking at a laptop to buy.
      </p>
      <button 
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={formRedirect}
      >
        Go to Laptop Price Gauge
      </button>
    </div>
  );
}
