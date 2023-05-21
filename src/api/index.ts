import { browser } from "$app/environment";
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const remote = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

const requestHandler = (conf: InternalAxiosRequestConfig) => {
	const accessToken = Cookies.get("access_token");

	if (!conf.headers.Authorization) {
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

const responseErrorHandler = async (err: AxiosError) => {
	// 서버 api 조회 시 예외처리
	if (!browser) {
		return err.response;
	}

	const { data, status } = err.response as AxiosResponse<{
		payload?: { isExpiredToken: boolean };
	}>;
	// access token 만료 시 refresh
	if (status === 401 && data?.payload?.isExpiredToken) {
		const expireTime = Date.now() + 7200000 - 600000; // 2시간 - 10분

		const { data, status } = await remote.post<{ accessToken: string }>("/api/auth/refresh");

		if (status === 200) {
			Cookies.set("access_token", data.accessToken, {
				path: "/",
				secure: true,
				expires: new Date(expireTime),
			});

			const res = await remote.request(err.config!);
			return {
				data: res.data,
				status: res.status,
			};
		}
	}

	return { data, status };
};

remote.interceptors.response.use(responseHandler, responseErrorHandler);

export default remote;
