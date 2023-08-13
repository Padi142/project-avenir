import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import Github from '@auth/core/providers/github';
import 'dotenv/config';
import type { Handle } from '@sveltejs/kit';

export const handle = SvelteKitAuth(async (event) => {
	const authOptions = {
		providers: [
			Discord({
				clientId: process.env.DISCORD_APP_ID,
				clientSecret: process.env.DISCORD_LOGIN_SECRET
			}),
			Github({
				clientId: process.env.GITHUB_ID,
				clientSecret: process.env.GITHUB_SECRET
			})
		],
		secret: process.env.AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
}) satisfies Handle;
// export const handle: Handle = async ({ event, resolve }) => {
//   // get cookies from browser
//   const session = event.cookies.get('session')
//   if (!session) {
//     // if there is no session load page as normal
//     return await resolve(event)
//   }

//   // if `user` exists set `events.local`q
//     event.locals.user = JSON.parse(session)

//   // load page as normal
//   return await resolve(event)
// }
