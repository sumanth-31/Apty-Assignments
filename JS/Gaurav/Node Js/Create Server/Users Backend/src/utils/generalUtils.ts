import { USERS } from "../constant";
export function findUser(id: string): number {
	for (let i = 0; i < USERS.length; i++) {
		if (USERS[i].id === id) return i;
	}
	return -1;
}
