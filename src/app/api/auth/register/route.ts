import axiosInstance from "@/app/_utils/axiosInstance";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = await axiosInstance.post("auth/register", body);
        const data = response.data;
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