import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './pagination.dto';

interface FindAllResponse {
  users: UsersEntity[];
  totalCount: number;
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll({ page, limit }: PaginationDto): Promise<FindAllResponse> {
    const skippedItems = (page - 1) * limit;

    const totalCount = await this.usersRepo.count();

    const users = await this.usersRepo.find({
      skip: skippedItems,
      take: limit,
    });

    return { users, totalCount };
  }
}
