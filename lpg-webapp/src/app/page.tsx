import Link from "next/link";

export default function Home() {
  return (
    <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
      <h1 className="text-3xl font-bold">Laptop Price Gauge</h1>
      <p className="text-center">
        Welcome to the Laptop Price Gauge! Here you can see the overall value of
        the laptop you are looking at based on the components of the laptop, and find
        the benchmark values for each component, as well as the value of the laptop based
        on comparisons with all other components.
        <br />
        The goal of this application is to help you decide which laptop has the most value,
        and give you more information when looking at a laptop to buy.
      </p>
      <Link href="/form">
        <p className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300">
          Go to Laptop Price Gauge
        </p>
      </Link>
    </div>
  );
}
