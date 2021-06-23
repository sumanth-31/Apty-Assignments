import { Response } from "express";
import { IResponse, IUser } from "../interfaces";
export function badRequest(res: Response, message: string) {
	const responseData: IResponse = { message };
	res.status(400).send(responseData);
}
export function okResponse(res: Response, users: IUser[]) {
	const responseData: IResponse = { message: "Success", users };
	res.status(200).send(responseData);
}
