import { UniversitiesService } from './universities.service';
import { CreateUniversityInput, University } from '../graphql.schema';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
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

  @Mutation('createUniversity')
  create(
    @Args('createUniversityInput') args: CreateUniversityInput,
  ): University {
    return this.universitiesService.create(args);
  }
}
