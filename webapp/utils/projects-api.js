import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export { getPublicProjects, getPrivateProjects, postProject };

import { getIdToken, getAccessToken } from './auth';

function getPublicProjects () {
  const url = `${BASE_URL}/api/projects/`;
  return axios.get(url).then(response => response.data.data);
}

function postProject(project) {
  const url = `${BASE_URL}/api/projects/`;
  // console.log('access: ', getAccessToken())
  // console.log('id: ', getIdToken())
  console.log(project);
  axios.post(url, {
    body: {
      name: 'test',
      description: 'test',
    }
  })
  // return axios.post(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }, body: project }).then(response => response.data);
}
