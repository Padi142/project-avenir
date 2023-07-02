import { users, type User } from '$lib/db/schema/users';
import { get } from 'svelte/store';
import UserIDStore from '../../stores/user_store';
import type { Actions, PageServerLoad } from './$types';
import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	const userHash = get(UserIDStore);
	if (userHash == '') {
		throw redirect(302, '/');
	}

	const login = url.searchParams.get('isFirstLogin');

	return {
		user: fetchUser(userHash),
		isFirstLogin: login != null ? login : false
	};
}) satisfies PageServerLoad;

const fetchUser = async (userHash: string): Promise<User | null> => {
	const usersResult = await drizzle_db
		.select()
		.from(users)
		.where(eq(users.hash, userHash))
		.limit(1);

	return usersResult[0];
};
