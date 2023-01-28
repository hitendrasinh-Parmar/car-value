import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) { }

  create(email: string, password: string) {
    const user = this.repo.create({
      email, password
    })

    return this.repo.save(user);
  }

  findOne(id: number) {

    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } })
  }

  find(email: string) {
    return this.repo.find({ where: { email } })
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.repo.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('user not found')
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return this.repo.remove(user);
  }
}
