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

// function getAllKeys(obj) {
//   const keyList = [];

//   for (const key of Object.keys(obj)) {
//     keyList.push({ key });

//     const hasSubKey =
//       !obj[key].length &&
//       obj[key].length !== 0 &&
//       Object.getOwnPropertyNames(obj[key]).length;

//     if (hasSubKey) {
//       const subKeys = Object.getOwnPropertyNames(obj[key]);

//       keyList[keyList.length - 1].subKeys = subKeys;
//       //   console.log('keyList :>> ', keyList);
//     }
//   }
//   return keyList;
// }

function getAllValue(obj) {
  console.log('obj :>> ', obj);
  lodash.forIn(obj, (value, key) => {
    console.group(`key: ${key}`);
    console.log(`has value:`, value);
    if (
      lodash.isArray(value) ||
      lodash.isPlainObject(value) ||
      lodash.isObject(value)
    ) {
      getAllValue(value);
    }
    console.groupEnd();
  });

  //   const allKeys = lodash.map(obj, key => {
  //     //   console.log('key :>> ', key);

  //     if (lodash.isPlainObject(key)) {
  //       console.log('isPlainObject key :>> ', key);

  //       //   getAllValue(key);
  //     }

  //     if (lodash.isArray(key)) {
  //       console.log('isArray key :>> ', key);

  //       //   getAllValue(key);
  //     }

  //     // console.log('lodash.keys(key) :>> ', lodash.keys(key));
  //   });
}

function renderKeyLi(keyArray) {
  const list = keyArray.map(({ key, subKeys }) => {
    const p = document.createElement('p');

    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');

    li.className = 'keys__item';
    label.textContent = ` ${key}`;
    input.type = 'checkbox';
    input.name = `${key}`;
    input.dataset.key = `${key}`;

    label.prepend(input);
    li.append(label);

    if (subKeys) {
      //   console.log(subKeys);
      const subLI = subKeys
        .map(
          el =>
            `<li class="keys__subitem"><label><input type="checkbox" name="${el}" data-key="${el}"/> ${el}</label></li>`
        )
        .join('');
      const subUL = document.createElement('ul');
      subUL.className = 'keys__sublist';
      subUL.innerHTML = subLI;
      li.append(subUL);
      //   li.insertAdjacentHTML('beforeend', subUL);
      //   console.log('subLI :>> ', subUL);
      //   console.log('li :>> ', li);
    }

    return li;
  });
  //

  refs.ul.append(...list);
}

function onClear() {
  refs.ul.innerHTML = '';
  refs.urlContainer.innerHTML = '';
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
    getAllValue(data);
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
