import axios from "axios";

const BACKEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_BACKEND_URL;
const instance = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;