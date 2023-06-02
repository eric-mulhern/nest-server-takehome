import { universities } from 'src/model/universities.json';
import { writeFileSync } from 'fs';
import { join } from 'path';

// updates latest-state-id.json to reflect the id of the most recently added state
const latestStateId = universities.reduce((max, current) => {
  return Math.max(max, current.city.state.id);
}, 1);

writeFileSync(
  join(process.cwd(), 'src/model/latest-state-id.json'),
  JSON.stringify({ latestStateId }),
);
