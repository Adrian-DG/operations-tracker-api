import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _repository: Repository<User>,
  ) {}

  findAllyUsers() {
    return this._repository.find();
  }

  createUser(user: User): Promise<User> {
    const newUser = this._repository.create(user);
    return this._repository.save(newUser);
  }
}
