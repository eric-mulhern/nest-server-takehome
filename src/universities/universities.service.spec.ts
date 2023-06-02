import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
import { UniversitiesService } from './universities.service';
import { universities } from '../model/universities.json';
import { CreateUniversityInput, University } from 'src/graphql.schema';
import { readFileSync } from 'fs';

describe('AppController', () => {
  let universitiesService: UniversitiesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // controllers: [AppController],
      providers: [UniversitiesService],
    }).compile();

    universitiesService = app.get<UniversitiesService>(UniversitiesService);
  });

  describe('universities service', () => {
    it('should return a list of universities', () => {
      expect(universitiesService.getUniversities()).toBe(universities);
    });

    it('should return a university by id', () => {
      const ID = 2;
      const university2: University = universities.find(
        (university) => university.id === ID,
      );
      expect(universitiesService.getUniversityById(ID)).toBe(university2);
    });

    it('should create a new university', () => {
      const newUniversityNumber = universities[universities.length - 1].id + 1;
      const createUniversityInput: CreateUniversityInput = {
        name: `Test Uni ${newUniversityNumber}`,
        city: {
          name: 'Paradise City',
          state: {
            name: 'Kentucky',
          },
        },
      };
      const createdUniversity = universitiesService.create(
        createUniversityInput,
      );
      const { universities: updatedUniversities } = JSON.parse(
        readFileSync('src/model/universities.json', { encoding: 'utf-8' }),
      );

      expect(createdUniversity).toEqual(
        updatedUniversities[updatedUniversities.length - 1],
      );
    });
  });
});
