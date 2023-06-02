import { UniversitiesService } from './universities.service';
import { CreateUniversityInput, University } from '../graphql.schema';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Public } from 'src/auth/is-public.decorator';

@Resolver('Universities')
export class UniversitiesResolver {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Public()
  @Query('universities')
  universities(): University[] {
    return this.universitiesService.getUniversities();
  }

  @Public()
  @Query('university')
  getUniversityById(
    @Args('id', ParseIntPipe)
    id: number,
  ): University {
    return this.universitiesService.getUniversityById(id);
  }

  @Roles(Role.Admin)
  @Mutation('createUniversity')
  create(
    @Args('createUniversityInput') args: CreateUniversityInput,
  ): University {
    return this.universitiesService.create(args);
  }
}
