import { users, type User } from '$lib/db/schema/users';
import { get } from 'svelte/store';
import UserIDStore from '../../stores/user_store';
import type { Actions, PageServerLoad } from './$types';
import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { codes } from '$lib/db/schema/codes';
import { page } from '$app/stores'

export const load = (async ({ url, locals }) => {
	const user = locals.user
	if (user === null) {
		throw redirect(302, '/');
	}

	const login = url.searchParams.get('isFirstLogin');
	console.log(user)
	return {
		user: user,
		isFirstLogin: JSON.parse(login ?? 'false')
	};
}) satisfies PageServerLoad;

const fetchUser = async (userHash: string): Promise<User> => {
	const usersResult = await drizzle_db
		.select()
		.from(users)
		.where(eq(users.hash, userHash))
		.limit(1);

	return usersResult[0];
};

export const actions = {
	send_code_message: async ({ params, request }) => {
		const data = await request.formData();
		const uuid = data.get('messageField')?.toString().trim();

		// const code = await findCode(params.codeID);

		// await drizzle_db
		// 	.insert(codes)
		// 	.values({ name: name, hash: uuid, location: location, points: 1 });
	}
};

const findCode = async (codeID: string) => {
	const codesResult = await drizzle_db.select().from(codes).where(eq(codes.hash, codeID)).limit(1);
	return codesResult[0];
};
