import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { users } from '$lib/db/schema/users';

import type { PageServerLoad } from './$types';
import { codes, type Code } from '$lib/db/schema/codes';
import UserIDStore from '../../../stores/user_store';

import { redirect } from '@sveltejs/kit';
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
	login: async ({ params, request }) => {
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
			throw redirect(302, '/dashboard');
		}

		const hash = createHashValue();
		await drizzle_db
			.insert(users)
			.values({ name: loginValue, hash: hash, level: 1, score: code.points });
		const user = await findUserByHash(loginValue);
		await drizzle_db.insert(scans).values({ codeId: code.id, userId: user.id });
		UserIDStore.set(hash);
		throw redirect(302, '/dashboard?firstLogin=true');
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
