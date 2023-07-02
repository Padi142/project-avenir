import { drizzle_db } from '$lib/db/connection.server';
import { users } from '$lib/db/schema/users';
import type { User } from '$lib/db/schema/users';

export const load = async () => {
	return { user: fetchUser() };
};

const fetchUser = async (): Promise<User | null> => {
	const user = await drizzle_db.select().from(users).limit(1);

	return user[0];
};
