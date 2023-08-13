import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { users, type User } from '$lib/db/schema/users';

import type { PageServerLoad } from './$types';
import { codes, type Code } from '$lib/db/schema/codes';
import UserIDStore from '../../../stores/user_store';

import { redirect, type Cookies } from '@sveltejs/kit';
import { createHash } from 'crypto';
import { showSnackbar } from '../../../stores/snackbar_store';
import { scans } from '$lib/db/schema/scan';

export const load = (async ({ params }) => {
	return {
		code: fetchCode(params.codeID)
	};
}) satisfies PageServerLoad;

const fetchCode = async (codeID: string): Promise<Code | null> => {
	const codesResult = await drizzle_db.select().from(codes).where(eq(codes.hash, codeID)).limit(1);

	if (codesResult.length == 0) {
		throw redirect(302, '/');
	}

	return codesResult[0];
};

export const actions = {
	login: async ({ cookies, params, request, locals }) => {
		const data = await request.formData();
		let loginValue = data.get('loginValue')?.toString().trim();
		const code = await findCode(params.codeID);

		if (!loginValue || loginValue.trim() === '') {
			showSnackbar('Username not valid', 5000);
			return;
		}
		if (loginValue.length === 64) {
			const user = await findUserByHash(loginValue);

			// User does not exist
			if (!user) {
				throw redirect(302, '/');
			}

			UserIDStore.set(loginValue);
			const scan = findScan(user.id, code.id);
			if (scan == null) {
				await drizzle_db.insert(scans).values({ codeId: code.id, userId: user.id });
				await drizzle_db
					.update(users)
					.set({ level: user.level + 1, score: user.score + code.points })
					.where(eq(users.id, user.id));
			}
			setUserCookie(user, cookies);

			throw redirect(302, '/dashboard');
		}

		const hash = createHashValue();
		await drizzle_db
			.insert(users)
			.values({ name: loginValue, hash: hash, level: 1, score: code.points });
		const user = await findUserByHash(loginValue);
		await drizzle_db.insert(scans).values({ codeId: code.id, userId: user.id });
		UserIDStore.set(hash);
		setUserCookie(user, cookies);

		throw redirect(302, '/dashboard?firstLogin=true');
	},

	discordLogin: async ({}) => {
		export const handle = SvelteKitAuth({
			providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
		});
	}
};

const findCode = async (codeID: string) => {
	const codesResult = await drizzle_db.select().from(codes).where(eq(codes.hash, codeID)).limit(1);
	return codesResult[0];
};

const findUserByHash = async (hash: string) => {
	const usersResult = await drizzle_db.select().from(users).where(eq(users.hash, hash)).limit(1);
	return usersResult[0];
};

const findScan = async (userID: number, codeID: number) => {
	const scanResult = await drizzle_db
		.select()
		.from(scans)
		.where(eq(scans.codeId, codeID))
		.where(eq(scans.userId, userID))
		.limit(1);
	return scanResult[0];
};

const createHashValue = () => {
	const hash = createHash('sha256').update(Date().toString()).digest('hex').toString();
	return hash;
};

const setUserCookie = (user: User, cookies: Cookies) => {
	cookies.set('session', JSON.stringify(user), {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30 * 1.25
	});
};
