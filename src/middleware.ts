
import { defineMiddleware } from "astro:middleware";
import { authClient } from "@/lib/auth-client";

export const onRequest = defineMiddleware(async (context, next) => {
	//console.log('env fastify => ', context.url.pathname)
	const currentPage = context.url.pathname;
	const publicRoutes = ['/', '/login'];


	const isAuthed: any = await authClient.getSession({
		fetchOptions: {
			headers: context.request.headers
		}
	})

	//console.log('session middleware => ', isAuthed)

	if (!isAuthed.data && !publicRoutes.includes(currentPage)) {
		context.locals.user = null;
		context.locals.session = null;
		return context.redirect('/login');
	}

	context.locals.user = isAuthed.data?.user;
	context.locals.session = isAuthed.data?.session;

	return next();
});