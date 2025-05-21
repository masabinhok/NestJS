import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'John',
      password: 'easy',
    },
    {
      userId: 2,
      username: 'Sabin',
      password: 'guess',
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username == username)
  }
}
