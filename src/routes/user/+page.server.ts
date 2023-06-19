
import { drizzle_db } from "$lib/db/connection.server";
import { User } from "$lib/db/schema/users";

export const load = async () => {
	return {user: fetchUser()} ;
};

const fetchUser = async () => {
	const user = await drizzle_db
		.select()
		.from(User)
		.limit(1);

	return user;
};