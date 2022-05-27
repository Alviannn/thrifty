import { DateTime } from 'luxon';
import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/api.util';
import type { UpdateType } from '../validations/user.validation';

class UserService {

    async get(userId: number) {
        const user = await User.findOneBy({ id: userId });
        if (!user) {
            throw Errors.NO_SESSION;
        }

        return user;
    }

    async topup(userId: number, balance: number) {
        const user = await this.get(userId);

        user.balance += balance;
        user.save();
    }

    async update(userId: number, rawUser: UpdateType) {
        const { password, fullName, phone, address } = rawUser;
        const user = await User.findOneBy({ id: userId });

        if (!user) {
            throw Errors.NO_PERMISSION;
        }

        user.password = password ?? user.password;
        user.fullName = fullName ?? user.fullName;
        user.phone = phone ?? user.phone;
        user.address = address ?? user.address;
        user.updatedAt = DateTime.utc();

        user.save();
    }

}

export const userService = new UserService();