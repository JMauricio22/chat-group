import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterUser } from '../../auth/dtos/user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create(body: RegisterUser): Promise<User> {
    const newUser = await this.userRepository.save(
      this.userRepository.create(body),
    );
    return newUser;
  }

  async setChannelToNull(user: User): Promise<User> {
    user.channel = null;
    const newUser = this.userRepository.save(user);
    return newUser;
  }
}
