"use client";

import React, { useState, useEffect } from "react";
import FormComponent from "@/components/formComponent";
import { ComponentList } from "@/interfaces/components";
import { CircularProgress } from "@mui/material";

export default function Form() {
    const [data, setData] = useState<ComponentList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    process.env.NEXT_PUBLIC_API_LOCAL + "/api/groupedComponents",
                    { cache: "default" }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const rawData = await res.json();

                // Separate data by type
                const componentlist: ComponentList = {
                    CPU: rawData.components.CPU,
                    GPU: rawData.components.GPU,
                    Storage: rawData.components.Storage,
                    RAM: rawData.components.RAM,
                    Categories: rawData.categories,
                };

                setData(componentlist);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="grid justify-items-center mx-auto w-1/2 mt-60">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid justify-items-center mx-auto w-1/2 mt-60">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="grid justify-items-center mx-auto w-1/2 mt-60 space-y-10">
            {data && <FormComponent data={data} />}
        </div>
    );
}