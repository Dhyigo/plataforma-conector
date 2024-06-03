import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { validationPipeConfig } from 'src/config/validation-pipe.config';
import mongoose from 'mongoose';

describe('PlatformManagerController', () => {
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

  it('should be able to create a platform manager', async () => {
    const res = await request(app.getHttpServer())
      .post('/platform-manager')
      .send({
        name: 'Test platform manager',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(HttpStatus.CREATED);

    expect(res.body).toHaveProperty('platformManager');
    expect(res.body.platformManager).toHaveProperty('id');
    expect(res.body.platformManager.name).toEqual('Test platform manager');
    expect(res.body.platformManager.email).toEqual('test@example.com');
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
