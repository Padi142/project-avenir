import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { users, type User } from '$lib/db/schema/users';

import type { Actions, PageServerLoad } from './$types';
import { codes, type Code } from '$lib/db/schema/codes';
import { goto } from '$app/navigation';
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
		const loginValue = data.get('loginValue')?.toString();

		const codesResult = await drizzle_db
			.select()
			.from(codes)
			.where(eq(codes.hash, params.codeID))
			.limit(1);
		const code = codesResult[0];

		if (loginValue == null || loginValue == '') {
			showSnackbar('Username not valid', 5000);
			return;
		}

		if (loginValue.length == 64) {
			const usersResult = await drizzle_db
				.select()
				.from(users)
				.where(eq(users.hash, loginValue))
				.limit(1);

			//User does not exist
			if (usersResult.length == 0) {
				throw redirect(302, '/');
			}

			UserIDStore.set(loginValue);

			const user = usersResult[0];

			await drizzle_db.insert(scans).values({ codeId: code.id, userId: user.id });

			throw redirect(302, '/dashboard');
		}

		const hash = createHash('sha256').update(Date().toString()).digest('hex').toString();

		await drizzle_db.insert(users).values({ name: loginValue, hash: hash });

		const user = await drizzle_db.select().from(users).where(eq(users.hash, loginValue)).limit(1);

		await drizzle_db.insert(scans).values({ codeId: code.id, userId: user[0].id });

		UserIDStore.set(hash);
		throw redirect(302, '/dashboard?firstLogin=true');
	}
};
