import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceServiceController } from './persistence-service.controller';
import { PersistenceServiceService } from './persistence-service.service';

describe('PersistenceServiceController', () => {
  let persistenceServiceController: PersistenceServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersistenceServiceController],
      providers: [PersistenceServiceService],
    }).compile();

    persistenceServiceController = app.get<PersistenceServiceController>(PersistenceServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(persistenceServiceController.getHello()).toBe('Hello World!');
    });
  });
});
