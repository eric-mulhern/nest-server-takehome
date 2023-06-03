import { writeFileSync } from 'fs';
import { join } from 'path';

export const updateStatesModel = (
  states,
  latestCityId: number,
  latestStateId: number,
  cityName: string,
  stateName: string,
) => {
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
  return {
    newStateId: latestStateId + 1,
    newCityId
  }
};
