import remote from "./";
import Cookies from "js-cookie";

interface User {
	id: string;
	name: string;
	role: "USER" | "ADMIN";
}

interface LoginResponse extends User {
	isAllowed: boolean;
	accessToken: string;
}

interface LoginRequest {
	id: string;
	password: string;
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

	Cookies.set("access_token", data.accessToken, { path: "/", secure: true });

	return { data, status, message: null };
}

export async function getUserState() {
	const { data, status } = await remote.get<User>("/api/auth/");

	return {
		data,
		status,
	};
}
