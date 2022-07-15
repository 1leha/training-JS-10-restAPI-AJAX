import { reject } from 'lodash';
import Notiflix from 'notiflix';

export const fetchDataFromApi = url => {
  return fetch(url)
    .then(response => response.json())
    .catch(e => {
      Notiflix.Notify.failure('No JSON or wrong link!');
      throw new Error('No JSON or wrong link!');
    });
};
