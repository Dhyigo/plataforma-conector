import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {
  AppError,
  Email,
  PlatformManager,
  PlatformManagerRepository,
  SimpleName,
} from 'rules';
import { PlatformManagerModel } from './platform-manager.schema';
import { Injectable } from '@nestjs/common';
import { MongoPlatformManagerMapper } from './mongo-platform-manager-mapper';

const DUPLICATE_KEY_ERROR = 11000;

@Injectable()
export class MongoPlatformManagerRepository
  implements PlatformManagerRepository
{
  constructor(
    @InjectModel(PlatformManager.name)
    private platformManagerModel: Model<PlatformManagerModel>,
  ) {}

  async create(platformManager: PlatformManager): Promise<void> {
    try {
      const raw = MongoPlatformManagerMapper.toMongo(platformManager);
      await this.platformManagerModel.create(raw);
    } catch (e) {
      if (e?.errorResponse?.code === DUPLICATE_KEY_ERROR) {
        throw new AppError({
          message: 'Já existe um gerente de plataforma com esse e-mail.',
          statusCode: StatusCodes.CONFLICT,
        });
      }

      throw new AppError({
        message: 'Error interno ao persistir os dados',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findById(platformManagerId: string) {
    try {
      const query = mongoose.sanitizeFilter({
        id: platformManagerId,
      });
      const response = await this.platformManagerModel.findOne(query);

      if (response == null) {
        return null;
      }

      return new PlatformManager(
        {
          name: new SimpleName(response.name),
          email: new Email(response.email),
          password: response.password,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        },
        response.id,
      );
    } catch {
      throw new AppError({
        message: 'Gerente de plataforma não encontrado.',
        statusCode: 404,
      });
    }
  }

  async save(platformManager: PlatformManager): Promise<void> {
    try {
      const query = mongoose.sanitizeFilter({
        id: platformManager.id,
      });

      await this.platformManagerModel.findOneAndUpdate(query, {
        name: platformManager.name,
        email: platformManager.email,
        password: platformManager.password,
        updatedAt: platformManager.updatedAt,
      });
    } catch (e) {
      if (e?.errorResponse?.code === DUPLICATE_KEY_ERROR) {
        throw new AppError({
          message: 'Já existe um gerente de plataforma com esse e-mail.',
          statusCode: StatusCodes.CONFLICT,
        });
      }

      throw new AppError({
        message: 'Error interno ao atualizar os dados',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
