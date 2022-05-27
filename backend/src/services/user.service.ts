import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/api.util';

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

}

export const userService = new UserService();