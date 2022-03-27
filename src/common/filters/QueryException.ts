import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { DatabaseError } from 'pg-protocol';

@Catch()
export class QueryException implements ExceptionFilter {
  catch(exception: QueryFailedError, context: ArgumentsHost) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: (exception.driverError as DatabaseError).detail,
    });
  }
}
