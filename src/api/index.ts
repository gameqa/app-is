import axios, { AxiosRequestConfig } from "axios";

/**
 * Module imports an instance of Axios
 * that accesses the api root by default
 */
const isProd = true;

const url = isProd
	? "https://spurningar.herokuapp.com"
	: "http://localhost:5000";

const r = axios.create({
	baseURL: url,
	withCredentials: true,
});

export default r;
