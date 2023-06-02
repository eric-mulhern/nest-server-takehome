import { Injectable } from '@nestjs/common';
import { CreateUniversityInput, University } from '../graphql.schema';
import { universities } from '../model/universities.json';
import { latestCityId } from '../model/latest-city-id.json';
import { latestStateId } from '../model/latest-state-id.json';
import { states } from '../model/states.json';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UniversitiesService {
  getUniversities(): University[] {
    if (universities.length) return universities;
    else throw new Error('Could not find any universities');
  }

  getUniversityById(id: number): University | undefined {
    const university = universities.find((uni) => uni.id === id);
    if (university) return university;
    else throw new Error(`Could not find University with ID ${id}`);
  }

  create(university: CreateUniversityInput): University {
    const cityName = university.city.name;
    const stateName = university.city.state.name;

    // if the city doesn't exist in the states model
    if (!states[stateName]?.cities[cityName]) {
      // if the state doesn't exist in the states model,
      if (!states[stateName]) {
        // update states model to include new state
        const newStateId = latestStateId + 1;
        states[stateName] = {
          id: newStateId,
          cities: {},
        };
        // update latest state id
        writeFileSync(
          join(process.cwd(), 'src/model/latest-state-id.json'),
          JSON.stringify({ latestStateId: newStateId }),
        );
      }
      // update states model to include new city
      const newCityId = latestCityId + 1;
      states[stateName].cities[cityName] = newCityId;
      // update latest city id
      writeFileSync(
        join(process.cwd(), 'src/model/latest-city-id.json'),
        JSON.stringify({ latestCityId: newCityId }),
      );
      // save changes to states model
      writeFileSync(
        join(process.cwd(), 'src/model/states.json'),
        JSON.stringify({ states }),
      );
    }

    const newUniversity: University = {
      name: university.name,
      id: universities[universities.length - 1].id + 1,
      city: {
        name: cityName,
        id: states[stateName].cities[cityName],
        state: {
          name: stateName,
          id: states[stateName].id,
        },
      },
    };
    universities.push(newUniversity);

    writeFileSync(
      join(process.cwd(), 'src/model/universities.json'),
      JSON.stringify({ universities }),
    );
    return newUniversity;
  }
}
