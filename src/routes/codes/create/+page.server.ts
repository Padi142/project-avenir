import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { drizzle_db } from '$lib/db/connection.server';
import { type Code, codes } from '$lib/db/schema/codes';
import { showSnackbar } from '../../../stores/snackbar_store';

export const load = (async ({ params }) => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	create_code: async ({ params, request }) => {
		const data = await request.formData();
		const uuid = data.get('uuid')?.toString().trim();
		const name = data.get('name')?.toString().trim();
		const location = data.get('location')?.toString().trim();

		if (!uuid || !name) {
			showSnackbar('UUID not valid', 5000);
			return;
		}

		await drizzle_db
			.insert(codes)
			.values({ name: name, hash: uuid, location: location, points: 1 });

		throw redirect(302, '/codes/create');
	}
};
