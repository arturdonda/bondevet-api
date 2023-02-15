import { adaptRoute } from '@main/adapters';
import {
	changeUserPasswordController,
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserByIdController,
	inviteUserController,
	updateUserController,
} from '@main/factories/user';
import { authorize } from '@main/middlewares/authorize';
import { Router } from 'express';

export default (router: Router): void => {
	const prefix = 'users';

	router.get(`/${prefix}`, authorize, adaptRoute(getAllUsersController)); // Get all users

	router.get(`/${prefix}/:id`, authorize, adaptRoute(getUserByIdController)); // Get user by id

	router.post(`/${prefix}`, adaptRoute(createUserController)); // Create user

	router.delete(`/${prefix}`, authorize, adaptRoute(deleteUserController)); // Delete user

	router.post(`/${prefix}/invite`, authorize, adaptRoute(inviteUserController)); // Invite user

	router.patch(`/${prefix}`, authorize, adaptRoute(updateUserController)); // Update user info

	router.patch(`/${prefix}/password`, authorize, adaptRoute(changeUserPasswordController)); // Update user password
};
