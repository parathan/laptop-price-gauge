import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Laptop Price Gauge</h1>
      <p>
        Welcome to the Laptop Price Gauge! Here you can see the overall value of
        the laptop you are looking at based on the components of the laptop, and compare
        it with the prices that have been provided to you from retailers.
        <br />
        The goal of this application is to help you decide which laptop has the most value,
        and give you more information when looking at a laptop to buy.
      </p>
      <button>
        Go to Laptop Price Gauge
      </button>
    </div>
  );
}
