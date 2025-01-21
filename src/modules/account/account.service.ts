import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';

@Injectable()
class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getOne(email: string) {
    const account = await this.accountRepository.findOne({
      where: {
        email,
      },
    });

    return account;
  }
}

export { AccountService };
