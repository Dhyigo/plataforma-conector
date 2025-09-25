import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { validationPipeConfig } from 'src/config/validation-pipe.config';
import mongoose from 'mongoose';
import { PlatformManagerSchema } from 'src/platform-manager/database/mongodb/ticket.schema';

describe('Request - Update identification data a Platform manager', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    process.env.DATABASE_URL = mongoUri;

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication({
      logger: false,
    });
    app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
    await app.init();
  });

  it('should be able to update a identification data platform manager', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/platform-manager/')
      .send({
        name: 'Test platform manager',
        email: 'test@example.com',
        password: 'password123',
      });

    // dados-de-identificacao

    await request(app.getHttpServer())
      .patch(
        `/platform-manager/dados-de-identificacao/${createRes.body.platformManager.id}`,
      )
      .send({
        name: 'new name',
        email: 'new@example.com',
      });
  });

  it('should not create a platform manager with a duplicate email address', async () => {
    await request(app.getHttpServer()).post('/platform-manager').send({
      name: 'Test platform manager',
      email: 'test@example.com',
      password: 'password123',
    });

    const res = await request(app.getHttpServer())
      .post('/platform-manager')
      .send({
        name: 'Test platform manager',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(HttpStatus.CONFLICT);
  });

  it('should not create a platform manager with a invalid data', async () => {
    await request(app.getHttpServer())
      .post('/platform-manager')
      .send({
        name: 'Te',
        email: 'invalid-email',
        password: '123',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message).toHaveLength(3);
      });
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await app.close();
  });
});
