import type { Handle } from "@sveltejs/kit";
import remote from "./api";

export const handle = (async ({ event, resolve }) => {
	const accessToken = event.cookies.get("access_token");

	const { data, status } = await remote.get("http://localhost:4000/api/auth", {
		headers: { Authorization: accessToken },
	});

	if (status === 200) {
		event.locals.user = data;
	}

	if (status === 401 || status === 500) {
		event.locals.user = null;
	}

	return await resolve(event);
}) satisfies Handle;
