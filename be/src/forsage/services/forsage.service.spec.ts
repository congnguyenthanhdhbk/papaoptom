import { Test, TestingModule } from '@nestjs/testing';
import { ForsageService } from './forsage.service';

describe('ForsageService', () => {
  let service: ForsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForsageService],
    }).compile();

    service = module.get<ForsageService>(ForsageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
