import { UniversitiesService } from './universities.service';
import { University } from '../graphql.schema';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('Universities')
export class UniversitiesResolver {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Query('universities')
  universities(): University[] {
    return this.universitiesService.getUniversities();
  }

  @Query('university')
  getUniversityById(
    @Args('id', ParseIntPipe)
    id: number,
  ): University {
    return this.universitiesService.getUniversityById(id);
  }
}
