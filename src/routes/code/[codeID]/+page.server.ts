import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { users, type User } from '$lib/db/schema/users';

import type { Actions, PageServerLoad } from './$types';
import { codes, type Code } from '$lib/db/schema/codes';
import { goto } from '$app/navigation';
import UserIDStore from '../../../stores/user_store';

import { redirect } from '@sveltejs/kit';
import { createHash } from 'crypto';

export const load = (async ({ params }) => {
	return {
		code: fetchCode(params.codeID)
	};
}) satisfies PageServerLoad;

const fetchCode = async (codeID: string): Promise<Code | null> => {
	const codesResult = await drizzle_db.select().from(codes).where(eq(codes.hash, codeID)).limit(1);

	return codesResult[0];
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const loginValue = data.get('loginValue')?.toString();

		if (loginValue == null) {
			return;
		}

		if (loginValue.length == 64) {
			UserIDStore.set(loginValue);
			throw redirect(302, '/dashboard');
		}

		const hash =  createHash('sha256').update(Date().toString()).digest('hex').toString();

	    await drizzle_db.insert(users).values({ name: loginValue, hash: hash });

		UserIDStore.set(hash);
		throw redirect(302, '/dashboard?firstLogin=true');

	}
};
