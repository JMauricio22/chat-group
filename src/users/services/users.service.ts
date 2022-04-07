import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@users/entities/user.entity';
import { RegisterUser, UpdateUser } from '@auth/dtos/user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} doest not exist`);
    }
    return user;
  }

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

  async update(id: number, body: UpdateUser) {
    const user = await this.findById(id);
    if (body.password) {
      const newPassword = await bcrypt.hash(body.password, 10);
      user.password = newPassword;
      delete body.password;
    }
    const updatedUser = await this.userRepository.save(
      this.userRepository.merge(user, body),
    );

    return updatedUser;
  }

  async setChannelToNull(user: User): Promise<User> {
    user.channel = null;
    const newUser = this.userRepository.save(user);
    return newUser;
  }
}
