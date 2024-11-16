import { Test, TestingModule } from '@nestjs/testing';

import {
  AppController,
  type AppController as TAppController,
} from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: TAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<TAppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
