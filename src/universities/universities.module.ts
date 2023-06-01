import { Module } from '@nestjs/common';

import { UniversitiesResolver } from './universities.resolver';
import { UniversitiesService } from './universities.service';

@Module({
  providers: [UniversitiesService, UniversitiesResolver],
})
export class UniversitiesModule {}
