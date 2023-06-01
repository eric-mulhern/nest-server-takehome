import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UniversitiesService } from './universities/universities.service';
// import { UniversitiesResolver } from './universities/universities.resolver';
import { join } from 'path';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    UniversitiesModule,
  ],
  // controllers: [AppController, UniversitiesResolver],
  // providers: [AppService, UniversitiesService],
})
export class AppModule {}
