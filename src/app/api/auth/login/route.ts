
import axiosInstance from "@/app/_utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("body", body);

        const response = await axiosInstance.post("/auth/login", body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = NextResponse.json(response.data);
        res.cookies.set("token", response.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });
        console.log("data", response.data);
        return res;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error("API Error:", axiosError?.response?.data || axiosError.message);

        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}
