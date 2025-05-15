import axiosInstance from "@/app/_utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Extract the token from request headers (or cookies)
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        // If no token is found, you can either throw an error or proceed without it
        if (!token) {
            throw new Error("No token provided");
        }
        const body = await request.json();
        console.log("body", body);

        const response = await axiosInstance.post("/user/cart", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("data", response.data);
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error("API Error:", axiosError?.response?.data || axiosError.message);

        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}

export async function GET(request: Request) {
    try {
        // Extract the token from request headers (or cookies)
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        // If no token is found, you can either throw an error or proceed without it
        if (!token) {
            throw new Error("No token provided");
        }

        const response = await axiosInstance.get("/user/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
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
