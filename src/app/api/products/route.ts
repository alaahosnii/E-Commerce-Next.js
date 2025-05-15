import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import axiosInstance from "../../../app/_utils/axiosInstance";
type ErrorResponse = {
    status: number;
    message: string;
}

export async function GET() {
    console.log("get products");

    try {
        const response = await axiosInstance.get("/products");
        const data = response.data;
        console.log("data", data);


        return NextResponse.json(data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("API Error:", axiosError?.response?.data || axiosError.message);

        return NextResponse.json(
            { error: axiosError?.response?.data.message || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}