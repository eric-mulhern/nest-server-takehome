import { universities } from 'src/model/universities.json';
import { writeFileSync } from 'fs';
import { join } from 'path';

// updates latest-city-id.json to reflect the id of the most recently added city
const latestCityId = universities.reduce((max, current) => {
  return Math.max(max, current.city.id);
}, 1);

writeFileSync(
  join(process.cwd(), 'src/model/latest-city-id.json'),
  JSON.stringify({ latestCityId }),
);
