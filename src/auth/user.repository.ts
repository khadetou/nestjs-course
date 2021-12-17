import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //Hash the password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      console.log(typeof error.code);
      if (error.code === '23505') {
        throw new ConflictException();
      }
    }
  }
}
