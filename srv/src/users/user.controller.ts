import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';
import { PaginationDto } from './pagination.dto';
import { MAX_PAGINATION_LIMIT } from 'src/constants';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    this.logger.log('Get all users paginationDto', paginationDto);

    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    const users = await this.userService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > MAX_PAGINATION_LIMIT ? MAX_PAGINATION_LIMIT : paginationDto.limit,
    });

    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }
}
