import { redirect } from "@sveltejs/kit";
import UserIDStore from "../../../stores/user_store";
import { get } from "svelte/store";
import type { PageServerLoad } from "../$types";
import { scans, type Scan } from "$lib/db/schema/scan";
import { drizzle_db } from "$lib/db/connection.server";
import { type User, users } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";
import { code_messages, type CodeMessage } from "$lib/db/schema/code_messages";

export const load = (async ({ url }) => {
	const userHash = get(UserIDStore);
	if (userHash == '') {
		throw redirect(302, '/');
	}

	const user = await fetchUser(userHash)
    if(user == null){
		throw redirect(302, '/');
    }

	return {
		scans: fetchUserScans(user),
		messages:fetchMessages(user),
	};
}) satisfies PageServerLoad;

const fetchUserScans = async (user: User): Promise<Array<Scan>> => {
	const scansResult = await drizzle_db
		.select()
		.from(scans)
		.where(eq(scans.userId, user.id))
		.orderBy(scans.scannedOn);

	return scansResult;
};

const fetchMessages = async ( user: User): Promise<Array<CodeMessage>> => {
	const scansResult = await drizzle_db
		.select()
		.from(code_messages)
		.where(eq(code_messages.senderId, user.id))
		.orderBy(code_messages.sentOn);

	return scansResult;
};

const fetchUser = async (userHash: string): Promise<User> => {
	const usersResult = await drizzle_db
		.select()
		.from(users)
		.where(eq(users.hash, userHash))
		.limit(1);

	return usersResult[0];
};