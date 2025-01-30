import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDTO } from '../auth/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(createAccountDto: CreateAccountDTO) {
    const hashedPassword = await bcrypt.hash(createAccountDto.password, 8);
    const account = this.accountRepository.create({
      ...createAccountDto,
      password: hashedPassword,
    });

    const savedAccount = await this.accountRepository.save(account);

    return savedAccount;
  }

  async getOne(email: string) {
    const account = await this.accountRepository.findOne({
      where: {
        email,
      },
    });

    return account;
  }

  async checkIsExists(email: string) {
    const isExists = await this.accountRepository.exists({
      where: {
        email,
      },
    });

    return isExists;
  }
}

export { AccountService };
