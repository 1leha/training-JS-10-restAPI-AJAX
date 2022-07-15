export const markupHtmlElement = (name, value) => {
  const li = document.createElement('li');

  if (value === undefined) {
    return;
  }

  li.innerHTML = `
            <label class="keys__label">
              <input class="keys__input" type="checkbox" />
              ${name}
              <span class="keys__value">${value}</span>
            </label>
          `;

  return li;
};
