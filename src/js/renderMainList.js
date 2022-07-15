import lodash from 'lodash';
import { renderSubList } from './renderSubList';

export function renderMainList(list) {
  const allList = lodash.map(list, el => {
    return renderSubList(el);
  });
  return allList;

}
