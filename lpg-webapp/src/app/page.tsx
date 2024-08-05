import Image from "next/image";

export default function Home() {
  return (
    <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-20">
      <h1 className="text-3xl font-bold">Laptop Price Gauge</h1>
      <p className="text-center">
        Welcome to the Laptop Price Gauge! Here you can see the overall value of
        the laptop you are looking at based on the components of the laptop, and compare
        it with the prices that have been provided to you from retailers.
        <br />
        The goal of this application is to help you decide which laptop has the most value,
        and give you more information when looking at a laptop to buy.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Go to Laptop Price Gauge
      </button>
    </div>
  );
}
