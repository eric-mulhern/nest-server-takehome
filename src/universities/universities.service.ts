import { Injectable } from '@nestjs/common';
import { CreateUniversityInput, University, UpdateUniversityInput } from '../graphql.schema';
import { universities } from '../model/universities.json';
import { latestCityId } from '../model/latest-city-id.json';
import { latestStateId } from '../model/latest-state-id.json';
import { states } from '../model/states.json';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { updateStatesModel } from './helpers';

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

    updateStatesModel(states, latestCityId, latestStateId, cityName, stateName);

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

    writeFileSync(join(process.cwd(), 'src/model/universities.json'), JSON.stringify({ universities }));
    return newUniversity;
  }

  update(university: UpdateUniversityInput): University {
    const newCityName = university?.city?.name;
    const newStateName = university?.city?.state?.name;

    // find university with matching ID
    const universityToUpdate: University = universities.find((uni) => uni.id === university.id);

    if (!universityToUpdate) {
      throw new Error(`Could not find University with ID ${university.id}`);
    }

    // for each field in UpdateUniversityInput, if there is a value & that value is different, update value
    
    universityToUpdate['name'] = university.name ?? universityToUpdate['name'];

    // if there's a change to state
    if (newStateName && universityToUpdate.city.state.name !== newStateName) {
      universityToUpdate.city.state.name = newStateName;
      if (states[newStateName]) {
        // new state already exists and has an id
        universityToUpdate.city.state.id = states[newStateName].id;
      } else {
        // new state doesn't exist: make a new one & create new city for this state
        const { newStateId, newCityId } = updateStatesModel(
          states,
          latestCityId,
          latestStateId,
          newCityName,
          newStateName,
        );
        universityToUpdate.city.state.id = newStateId;
        universityToUpdate.city.id = newCityId;
      }
    } else {
      // no change to state, but if there's a change to city,
      if (newCityName && universityToUpdate.city.name !== newCityName) {
        universityToUpdate.city.name = newCityName;
        // if new city exists in current state, set new city name & id
        if (states[universityToUpdate.city.state.name].cities[newCityName]) {
          universityToUpdate.city.id = states[universityToUpdate.city.state.name].id;
        } else {
          // else create new city
          const { newCityId } = updateStatesModel(states, latestCityId, latestStateId, newCityName, newStateName);
          universityToUpdate.city.id = newCityId;
        }
      }
    }

    writeFileSync(join(process.cwd(), 'src/model/universities.json'), JSON.stringify({ universities }));
    return universityToUpdate;
  }
}
