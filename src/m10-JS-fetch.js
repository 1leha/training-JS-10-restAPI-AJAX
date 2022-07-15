import { fetchDataFromApi } from './js/fetchDataFromApi';
import { convertFetchedDataToObject } from './js/convertFetchedDataToObject';
import { renderMainList } from './js/renderMainList';
import { clearElementTextContent } from './js/clearElementTextContent';

const refs = {
  ul: document.querySelector('.keys__list'),
  form: document.querySelector('.form'),
  urlContainer: document.querySelector('.url-container'),
  clearBtn: document.querySelector('button[name="clear"]'),
  getDataBtn: document.querySelector('button[data-button="getDataBtn"]'),
};
let linkURL = '';

refs.form.addEventListener('submit', onSubmit);
refs.clearBtn.addEventListener('click', onClear);

function onSubmit(e) {
  e.preventDefault();

  onClear();

  const {
    elements: { url },
  } = e.currentTarget;

  linkURL = url.value;

  fetchDataFromApi(linkURL)
    .then(data => {
      const dataList = convertFetchedDataToObject(data);
      const htmlElementsList = renderMainList(dataList);
      refs.ul.append(...htmlElementsList);
    })
    .catch(err => {
      refs.urlContainer.textContent = err;
    });
  e.currentTarget.reset();
}

function onClear() {
  clearElementTextContent(refs.ul);
  clearElementTextContent(refs.urlContainer);
}

function getChecked() {
  const listOfKeys = refs.ul.children;
  //   console.log('getChecked');
  return [...listOfKeys]
    .filter(el => el.firstElementChild.firstElementChild.checked)
    .map(el => {
      return { key: el.firstElementChild.firstElementChild.dataset.key };
    });
}

// function renderChecked() {
//   fetchDataFromApi(linkURL).then(data => {
//     //   fetchData('https://pokeapi.co/api/v2/pokemon/13').then(data => {
//     // console.log('getAllValue(data) >> ', getAllValue(data));
//     // console.log('data :>> ', data);
//     // console.log('lodash.isArrayLikeObject :>> ', lodash.isObject(data));
//     // console.log('getChecked :>> ', getChecked());
//     // const result = getChecked()
//     //   .map(({ key }) => `${key}: ` + data[key][0])
//     //   .join('; ');
//     // Notiflix.Report.success('Cheked...', result);
//     // console.table('result :>> ', result);
//   });
// }
