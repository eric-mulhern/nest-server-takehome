import { writeFileSync } from 'fs';
import { join } from 'path';

export const updateStatesModel = (
  states,
  latestCityId: number,
  latestStateId: number,
  cityName: string,
  stateName: string,
) => {
  let newStateId = latestStateId;
  let newCityId = latestCityId;
  // if the state doesn't exist in the states model,
  if (!states[stateName]) {
    // update states model to include new state
    newStateId++;
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
  // if the city doesn't exist in the states model,
  if (!states[stateName].cities[cityName]) {
    // update states model to include new city
    newCityId++;
    states[stateName].cities[cityName] = newCityId;
    // update latest city id
    writeFileSync(
      join(process.cwd(), 'src/model/latest-city-id.json'),
      JSON.stringify({ latestCityId: newCityId }),
    );
  }
  // save changes to states model
  writeFileSync(
    join(process.cwd(), 'src/model/states.json'),
    JSON.stringify({ states }),
  );
  return {
    newStateId,
    newCityId
  }
};
