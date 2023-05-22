import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { browser } from "$app/environment";

export const prerender = true;

export const load = (({ cookies, url, locals }) => {
	const accessToken = cookies.get("access_token");
	const refreshToken = cookies.get("refresh_token");
	const { user } = locals;
	const { pathname } = url;

	if (!refreshToken || !accessToken || !user) {
		if (pathname !== "/auth/login") {
			cookies.delete("access_token");
			cookies.delete("refresh_token");
			locals.user = null;
			throw redirect(307, "/auth/login");
		}
	}

	if (refreshToken && accessToken && user && pathname === "/auth/login") {
		throw redirect(307, "/");
	}

	return {
		refreshToken,
		user,
	};
}) satisfies LayoutServerLoad;
