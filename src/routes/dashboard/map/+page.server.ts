import { users, type User } from '$lib/db/schema/users';
import { get } from 'svelte/store';
import type { Actions, PageServerLoad } from './$types';
import { drizzle_db } from '$lib/db/connection.server';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { scans, type Scan } from '$lib/db/schema/scan';
import { alias } from 'drizzle-orm/pg-core';
import { codes, type Code } from '$lib/db/schema/codes';


export const load = (async ({ locals, url }) => {
	const user = locals.user
	if (user === null) {
		throw redirect(302, '/');
	}

	return {
		user: locals.user,
		scan: fetchScans(locals.user.id)
	};
}) satisfies PageServerLoad;

const fetchScans = async (userId: number): Promise<Array<{
	code: Code | null;
	scan_records: Scan | null;
}>> => {
	const code = alias(codes, 'code');

	const scansRes = await drizzle_db.select().from(scans).where(eq(scans.userId, userId)).fullJoin(code, eq(code.id, scans.codeId)).limit(1);

	return scansRes;
};

const fetchUser = async (userHash: string): Promise<User> => {
	const userRes = await drizzle_db.select().from(users).where(eq(users.hash, userHash)).limit(1);

	return userRes[0];
};
