import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

export { getPublicProjects, getPrivateProjects };

import { getIdToken, getAccessToken } from './auth';

function getPublicProjects () {
  const url = `${BASE_URL}/api/projects/public`;
  return axios.get(url).then(response => response.data);
}

function getPrivateStartupBattles() {
  const url = `${BASE_URL}/api/projects/private`;
  console.log('access: ', getAccessToken())
  console.log('id: ', getIdToken())
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
