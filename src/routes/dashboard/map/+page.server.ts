import { users, type User } from '$lib/db/schema/users';
import { get } from 'svelte/store';
import UserIDStore from '../../stores/user_store';
import type { Actions, PageServerLoad } from './$types';
import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { scans, type Scan } from '$lib/db/schema/scan';

export const load = (async ({ url }) => {
	const userHash = get(UserIDStore);
	if (userHash === '') {
		throw redirect(302, '/');
	}

	const user = await fetchUser(userHash);

	return {
		user: user,
		scan: 
	};
}) satisfies PageServerLoad;

const fetchScans = async (userId: number): Promise<Array<Scan>> => {
	const scansRes = await drizzle_db.select().from(scans).where(eq(scans.userId, userId)).limit(1);

	return scansRes;
};

const fetchUser = async (userHash: string): Promise<User> => {
	const userRes = await drizzle_db.select().from(users).where(eq(users.hash, userHash)).limit(1);

	return userRes[0];
};
