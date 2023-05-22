import { browser } from "$app/environment";
import remote from ".";
import Cookies from "js-cookie";

export interface User {
	id: string;
	name: string;
	role: "USER" | "ADMIN";
	isAllowed: boolean;
}

interface LoginRequest {
	id: string;
	password: string;
}

interface LoginResponse extends User {
	accessToken: string;
}

export interface TokenExpiredPayload {
	status: number;
	name: "UnAuthorizedError";
	message: "UnAuthorized";
	payload: {
		isExpiredToken: boolean;
	};
}

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}

export async function login(loginConf: LoginRequest) {
	const res = await remote.post<LoginResponse>("/api/auth/login", loginConf);

	const { data, status } = res;

	if (status === 401) {
		return {
			data,
			status,
			message: "아이디 또는 비밀번호가 일치하지 않습니다.",
		};
	}

	if (status === 500) {
		return {
			data,
			status,
			message: "서버 상태가 원활하지 않습니다.",
		};
	}

	const expireTime = Date.now() + 7200000 - 600000; // 2시간 - 10분
	Cookies.set("access_token", data.accessToken, {
		path: "/",
		secure: true,
		expires: new Date(expireTime),
	});

	return { data, status, message: null };
}

export async function getUserState(accessToken?: string) {
	const getUserPath = accessToken ? "http://localhost:4000/api/auth/" : "/api/auth/";
	const config = accessToken
		? {
				headers: { Authorization: accessToken },
		  }
		: undefined;

	const { data, status } = await remote.get<User | TokenExpiredPayload>(getUserPath, config);

	return {
		data,
		status,
	};
}

export async function refresh(refreshToken?: string) {
	const refreshUrl = refreshToken ? "http://localhost:4000/api/auth/refresh" : "/api/auth/refresh";

	const { data, status } = await remote.post<RefreshResponse>(refreshUrl, undefined, {
		headers: {
			"Content-Type": "text/plain",
			Cookie: `refresh_token=${refreshToken}`,
		},
	});

	return {
		data,
		status,
	};
}
