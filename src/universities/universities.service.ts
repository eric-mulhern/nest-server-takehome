import { Injectable } from '@nestjs/common';
import { University } from '../graphql.schema';

import { universities } from '../model/universities.json';

@Injectable()
export class UniversitiesService {
  getUniversities(): University[] {
    return universities;
  }

  getUniversityById(id: number): University {
    return universities.find((uni) => uni.id === id);
  }
}
