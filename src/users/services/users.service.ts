import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Configuration from '../../config/configuration';

@Injectable()
export class UsersService {
  constructor(
    @Inject(Configuration.KEY)
    private configService: ConfigType<typeof Configuration>,
  ) {}

  create() {
    return this.configService.postgres.dbName;
  }
}
