// import Handlebars from 'handlebars';
import Notiflix from 'notiflix';
import lodash from 'lodash';
// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => {
//     // Response handling
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });

// // console.dir(fetch('https://jsonplaceholder.typicode.com/users'));

// const headers = new Headers({
//   'Content-Type': 'application/json',
//   'X-Custom-Header': 'custom value',
// });

// headers.append('Content-Type', 'text/bash');
// headers.append('X-Custom-Header', 'custom value');
// headers.has('Content-Type'); // true
// headers.get('Content-Type'); // "text/bash"
// headers.set('Content-Type', 'application/json');
// headers.delete('X-Custom-Header');

// console.log('headers :>> ', headers);
// const url = ' https://pokeapi.co/api/v2/pokemon/ditto';

const options = {};
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
refs.getDataBtn.addEventListener('click', renderChecked);

function onSubmit(e) {
  e.preventDefault();

  const {
    elements: { url, send, clear },
  } = e.currentTarget;

  linkURL = url.value;
  refs.urlContainer.textContent = linkURL;

  //   console.log('fetchData(url) :>> ', fetchData(url));
  fetchData(linkURL).then(data => {
    const keyList = getAllKeys(data);
    renderKeyLi(keyList);
  });
  e.currentTarget.reset();
}

function onClear() {
  refs.ul.innerHTML = '';
  refs.urlContainer.innerHTML = '';
}

//   const {
//     elements: { delay, step, amount },
// } = e.currentTarget;

function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(e => {
      Notiflix.Notify.failure('No JSON or wrong link!');
      refs.urlContainer.textContent = 'No JSON or wrong link!';
    });
}

function getAllValue(obj) {
  //   console.log('obj :>> ', obj);

  const list = lodash.map(
    obj,
    (value, key) => {
      // console.group(`key: ${key}`);
      //   console.group(`Вложенность`);
      // console.log('list', list);
      if (
        lodash.isArray(value) ||
        lodash.isPlainObject(value) ||
        lodash.isObject(value)
      ) {
        // console.log(value);
        // getAllValue(value);
        return { key, value: getAllValue(value) };
      }
      //   console.log('{ key, value } :>> ', { key, value });
      //   console.groupEnd();
      return { key, value };
    },
    {}
  );
  return list;
}

// function renderCheckList(list) {
//   //   console.log('list :>> ', list);

//   lodash.each(list, (value, key) => {
//     // console.group(`key: ${key}`);
//     // console.log(value);

//     // console.log('создать внутренний ЮЛ');
//     // const innerUl = document.createElement('ul');
//     // const innerLi = document.createElement('li');
//     // innerLi.textContent = key;

//     if (
//       lodash.isArray(value) ||
//       lodash.isPlainObject(value) ||
//       lodash.isObject(value)
//     ) {
//       console.group(`key внутри: ${key}`);
//       console.log(value);
//       console.groupEnd();
//       //   console.log('создать внутренний ЛИ');

//       //   const outerLi = document.createElement('li');
//       //   outerLi.textContent = key;
//       //   console.log(outerLi);

//       renderCheckList(value);

//       //   outerLi.append(innerUl);
//     }

//     // console.log('создать ЛИ');
//     // innerUl.append(innerLi);

//     // refs.ul.append(outerLi);

//     console.groupEnd();
//   });
// }

function renderSubList(el) {
  if (
    lodash.isArray(el.value) ||
    lodash.isPlainObject(el.value) ||
    lodash.isObject(el.value)
  ) {
    //! step of recurtion --------------------------------------

    const subValueList = el.value.map(subValue => {
      return renderSubList(subValue);
    });

    const outerLi = document.createElement('li');
    const outerUl = document.createElement('ul');
    outerLi.textContent = el.key;

    outerLi.append(outerUl);
    outerUl.append(...subValueList);

    return outerLi;
  } else {
    //! base of recurtion --------------------------------------

    const innerLi = document.createElement('li');
    innerLi.textContent = el.key;

    return innerLi;
  }
}

function renderCheckList(list) {
  const allList = lodash.map(list, el => {
    return renderSubList(el);
  });

  refs.ul.append(...allList);
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

function renderChecked() {
  //   fetchData(linkURL).then(data => {
  fetchData('https://pokeapi.co/api/v2/pokemon/13').then(data => {
    // console.log('getAllValue(data) >> ', getAllValue(data));
    const checkList = getAllValue(data);
    // const checkList = data;
    console.log('checkList :>> ', checkList);
    renderCheckList(checkList);

    // console.log('data :>> ', data);
    // console.log('lodash.isArrayLikeObject :>> ', lodash.isObject(data));
    // console.log('getChecked :>> ', getChecked());
    // const result = getChecked()
    //   .map(({ key }) => `${key}: ` + data[key][0])
    //   .join('; ');
    // Notiflix.Report.success('Cheked...', result);
    // console.table('result :>> ', result);
  });
}

function listElement(template) {
//   el.key;
}

const templateElement = {
    
}
