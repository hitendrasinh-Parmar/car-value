import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { Users } from "./users.entity";
import { UsersService } from "./users.service";


describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    const users: Array<Users> = [

    ];
    fakeUserService = {
      find: (email: string) => {
        const filterdUsers = users.filter(user => user.email === email);
        return Promise.resolve(filterdUsers)
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999), email, password
        } as Users;
        users.push(user);
        return Promise.resolve(user);
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService
        }
      ]
    }).compile();

    service = module.get(AuthService);
  })
  it('can create an instance of auht service', async () => {
    expect(service).toBeDefined();
  })

  it('create new user with salted and hashed password', async () => {
    const user = await service.signup('test@gmail.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('throw error if user signs up with email that is in use', (done) => {

    service.signup('test@gmail.com', 'asdf').then(() => {
      service.signup('test@gmail.com', 'asdf')
        .catch((err) => {
          done();
        })
    })


  })

  it('throws an error if signin is called with unused email', (done) => {
    service.signin('pass3@gmail.com', 'asdf')
      .catch((err) => {
        done();
      })
  })

  it('throws if an invalid password is provided', (done) => {

    service.signup('pass3@gmail.com', 'asdf').then(() => {
      service.signin('pass3@gmail.com', 'asd')
        .catch((err) => {
          done();
        })
    })
  })

  it('return user if password match', async () => {
    await service.signup('pass8@gmail.com', "1")
    const user = await service.signin('pass8@gmail.com', "1");
    expect(user).toBeDefined()

  })
})