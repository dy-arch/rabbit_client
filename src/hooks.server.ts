import type { Handle, HandleFetch } from "@sveltejs/kit";
import { getUserState, refresh, type TokenExpiredPayload, type User } from "./api/auth";
import remote from "./api";

export const handle = (async ({ event, resolve }) => {
	const accessToken = event.cookies.get("access_token");
	const refreshToken = event.cookies.get("refresh_token");

	// refresh token 없을 경우 로직 실행 X
	if (!refreshToken) {
		return resolve(event);
	}

	// 첫 번째 유저 정보 조회
	const { data, status } = await getUserState(accessToken);
	const expiredPayload = data as TokenExpiredPayload;
	// 성공 시 user 정보 locals 등록
	if (status === 200) {
		event.locals.user = data as User;
		return resolve(event);
	}
	// 만료 시 locals.user null로 할당
	if (status !== 200 && !expiredPayload?.payload?.isExpiredToken) {
		event.locals.user = null;
		return resolve(event);
	}
	// token refresh
	const { data: refreshData, status: refreshStatus } = await refresh(refreshToken);
	// Unauthorized 시 return
	if (refreshStatus === 401) {
		return resolve(event);
	}
	// 성공 시 access token, refresh token cookie에 저장
	if (refreshStatus === 200) {
		const accessTokenExpiredTime = Date.now() + 7200000 - 600000;
		const refreshTokenExpiredTime = Date.now() + 86400 * 30 * 1000;
		// set access token
		event.cookies.set("access_token", refreshData.accessToken, {
			path: "/",
			expires: new Date(accessTokenExpiredTime),
			httpOnly: true,
		});
		// set refresh token
		event.cookies.set("refresh_token", refreshData.refreshToken, {
			path: "/",
			expires: new Date(refreshTokenExpiredTime),
			httpOnly: true,
		});
	}
	// 두 번째 유저 정보 조회
	const { data: secondData, status: secondStatus } = await getUserState(accessToken);
	// 성공 시 유저 정보 저장
	if (secondStatus === 200) {
		event.locals.user = secondData as User;
	}
	// 실패 시 유저 정보 null 할당
	if (secondStatus !== 200) {
		event.locals.user = null;
	}

	return await resolve(event);
}) satisfies Handle;
