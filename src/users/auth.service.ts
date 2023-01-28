import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { NotFoundException } from "@nestjs/common/exceptions";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use')
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(email, result);

    return user;

  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found')
    }

    const [salt, storedHash] = user.password.split('.');

    const hast = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hast.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}