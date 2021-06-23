import { IUser } from "./interfaces";

export const USERS: IUser[] = [
	{
		id: "1",
		name: "Sumanth",
		company: "Apty",
		role: "R&D Engineer",
	},
	{
		id: "2",
		name: "Pooja",
		company: "Apty Inc",
		role: "R&D Engineer",
	},
	{
		id: "3",
		name: "Navya",
		company: "Letznav",
		role: "R&D Engineer",
	},
	{
		id: "4",
		name: "Gaurav",
		company: "Apty",
		role: "SDE",
	},
];

export const API_URLS = {
	updateUserUrl: "/update",
	deleteUserUrl: "/delete",
	getUserUrl: "/",
};
