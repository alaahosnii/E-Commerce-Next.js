import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("get products");

    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log("data", data);


        return NextResponse.json(data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error("API Error:", axiosError?.response?.data || axiosError.message);

        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}