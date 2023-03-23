import axios from "axios";

/**
 * Module imports an instance of Axios
 * that accesses the api root by default
 */
const isProd = false;

const url = isProd
	? "https://spurningar.herokuapp.com"
	: "http://localhost:5000";

export default axios.create({
	baseURL: url,
	withCredentials: true,
});
