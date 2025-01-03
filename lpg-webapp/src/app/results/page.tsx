"use client";

import React, { useEffect, useState } from "react";
import { useBenchmarkContext } from "@/context/BenchmarkContext";
import { useRouter } from "next/navigation";
import { APIContext } from "@/interfaces/context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

async function getScore(request: APIContext) {
  const body = JSON.stringify({
    CPU_1: request.cpu1,
    GPU_1: request.gpu1,
    RAM_1: request.ram1,
    Storage_1: request.storage1,
    CPU_2: request.cpu2,
    GPU_2: request.gpu2,
    RAM_2: request.ram2,
    Storage_2: request.storage2,
    Category: request.category,
  });

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_LOCAL + "/api/computerScore/benchmark/two",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Results() {
  const router = useRouter();
  const { apiRequest } = useBenchmarkContext();

  const [isLoading, setIsLoading] = useState(true);
  const [gpuResult, setGpuResult] = useState(0);
  const [cpuResult, setCpuResult] = useState(0);
  const [ramResult, setRamResult] = useState(0);
  const [storageResult, setStorageResult] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  const [gpuResult2, setGpuResult2] = useState(0);
  const [cpuResult2, setCpuResult2] = useState(0);
  const [ramResult2, setRamResult2] = useState(0);
  const [storageResult2, setStorageResult2] = useState(0);
  const [totalResult2, setTotalResult2] = useState(0);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getScore(apiRequest);
        setCpuResult(data.cpU_1);
        setGpuResult(data.gpU_1);
        setRamResult(data.raM_1);
        setStorageResult(data.storage_1);
        setTotalResult(data.totalBenchmark_1);

        setCpuResult2(data.cpU_2);
        setGpuResult2(data.gpU_2);
        setRamResult2(data.raM_2);
        setStorageResult2(data.storage_2);
        setTotalResult2(data.totalBenchmark_2);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [apiRequest]);

  function goBack() {
    router.back();
  }

  if (isLoading) {
    return (
      <Box
        className="flex justify-center items-center h-screen"
        sx={{ display: "flex" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto w-full mt-20 space-y-10 px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
        Benchmark Results Comparison
      </h1>
      {/* Total Benchmark Highlight */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl rounded-xl p-8 flex justify-between items-center">
        <div className="text-3xl font-bold">Total Benchmark</div>
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <p className="text-lg font-semibold">PC 1</p>
            <p className="text-5xl font-extrabold">{Math.round(totalResult)}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Difference</p>
            <p
              className={`text-5xl font-extrabold ${
                totalResult - totalResult2 >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {totalResult - totalResult2 > 0
                ? `+${Math.round(totalResult - totalResult2)}`
                : Math.round(totalResult - totalResult2)}
              %
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">PC 2</p>
            <p className="text-5xl font-extrabold">{Math.round(totalResult2)}</p>
          </div>
        </div>
      </div>
      {/* Comparison Table */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <table className="w-full table-auto text-center border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-lg font-semibold py-4">Component</th>
              <th className="text-lg font-semibold py-4">PC 1</th>
              <th className="text-lg font-semibold py-4">Difference</th>
              <th className="text-lg font-semibold py-4">PC 2</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "CPU", value1: cpuResult, value2: cpuResult2 },
              { name: "GPU", value1: gpuResult, value2: gpuResult2 },
              { name: "RAM", value1: ramResult, value2: ramResult2 },
              { name: "Storage", value1: storageResult, value2: storageResult2 },
            ].map((item, index) => {
              const roundedValue1 = Math.round(item.value1);
              const roundedValue2 = Math.round(item.value2);
              const difference = roundedValue1 - roundedValue2;
              const isPositive = difference >= 0;

              return (
                <tr
                  key={item.name}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 border-b`}
                >
                  <td className="py-4 text-lg font-medium text-gray-700">
                    {item.name}
                  </td>
                  <td className="py-4 text-lg text-gray-600">
                    {roundedValue1}
                  </td>
                  <td
                    className={`py-4 text-lg font-semibold ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {difference > 0 ? `+${difference}` : difference}%
                  </td>
                  <td className="py-4 text-lg text-gray-600">
                    {roundedValue2}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Go Back Button */}
      <button
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
}
