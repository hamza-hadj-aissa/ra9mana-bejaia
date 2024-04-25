import {
  ArgumentsHost,
  Catch,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

type ResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | Object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const responseObject: ResponseObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal server error',
    };

    switch (true) {
      case exception instanceof HttpException:
        responseObject.statusCode = exception.getStatus();
        responseObject.response = exception.getResponse();
        break;
      case exception instanceof PrismaClientValidationError:
        responseObject.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        responseObject.response = exception.message.replace(/Invalid.*\n/g, '');
        break;
      case exception instanceof PrismaClientKnownRequestError:
        responseObject.statusCode = HttpStatus.BAD_REQUEST;
        responseObject.response = exception.message.replace(/Invalid.*\n/g, '');
        break;
      default:
        break;
    }

    response.status(responseObject.statusCode).json(responseObject);

    super.catch(exception, host);
  }
}
