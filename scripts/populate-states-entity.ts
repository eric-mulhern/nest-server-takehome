import { universities } from 'src/model/universities.json';
import { writeFileSync } from 'fs';
import { join } from 'path';

// updates cities.json to reflect the complete list of cities found in universities.json
const states = {};

universities.forEach((university) => {
  const stateName = university.city.state.name;
  const cityName = university.city.name;

  if (!states[stateName]) {
    states[stateName] = {
      stateId: university.city.state.id,
      cities: {},
    };
  }
  if (!states[stateName].cities[cityName])
    states[stateName].cities[cityName] = university.city.id;
});

writeFileSync(
  join(process.cwd(), 'src/model/states.json'),
  JSON.stringify({ states }),
);
