import { Router, Request, Response } from "express";
import { USERS, API_URLS } from "./constant";
import { IUser, IUserRequest, IResponse } from "./interfaces";
import { findUser, badRequest, okResponse } from "./utils";

export const userRouter = Router();

userRouter.put(API_URLS.updateUserUrl, function (req: Request, res: Response) {
	const { id, name, company, role } = <IUserRequest>(<any>req.body);
	const userInd = findUser(id);
	if (userInd === -1) return badRequest(res, "User Not Found");
	if (name) USERS[userInd].name = name;
	if (company) USERS[userInd].company = company;
	if (role) USERS[userInd].role = role;
	okResponse(res, USERS);
});

userRouter.delete(
	API_URLS.deleteUserUrl,
	function (req: Request, res: Response) {
		const { id } = <IUserRequest>(<any>req.query);
		const userInd = findUser(id);
		if (userInd === -1) return badRequest(res, "User Not Found");
		USERS.splice(userInd, 1);
		okResponse(res, USERS);
	}
);

userRouter.get(API_URLS.getUserUrl, function (req: Request, res: Response) {
	okResponse(res, USERS);
});
