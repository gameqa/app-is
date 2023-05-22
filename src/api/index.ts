import axios from "axios";
import * as GlobalConfig from "../config"
/**
 * Module imports an instance of Axios
 * that accesses the api root by default
 */
const isProd = true;

const url = isProd
	? GlobalConfig.PROD_SERVER
	: GlobalConfig.DEV_SERVER;

export default axios.create({
	baseURL: url,
	withCredentials: true
});
