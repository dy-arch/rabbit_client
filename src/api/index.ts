import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const remote = axios.create({ withCredentials: true });

const requestHandler = (conf: InternalAxiosRequestConfig) => {
	if (conf.url !== "/api/auth") {
		const accessToken = Cookies.get("access_token");
		conf.headers.Authorization = accessToken;
	}

	return conf;
};

const requestErrorHandler = (err: AxiosError) => {
	return Promise.reject(err);
};

remote.interceptors.request.use(requestHandler, requestErrorHandler);

const responseHandler = (res: AxiosResponse) => {
	return res;
};

const responseErrorHandler = (err: AxiosError) => {
	return err.response;
};

remote.interceptors.response.use(responseHandler, responseErrorHandler);

export default remote;
