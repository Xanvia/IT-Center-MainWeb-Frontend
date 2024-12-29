import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000, // 15s
  headers: {
    "Content-type": "application/json",
  },
});

export default Axios;
