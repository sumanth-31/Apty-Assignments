export interface IUser {
	id: string;
	name: string;
	company: string;
	role: string;
}
export interface IUserRequest {
	id: string;
	name?: string;
	company?: string;
	role?: string;
}
export interface IResponse {
	message: string;
	users?: IUser[];
	user?: IUser;
}
