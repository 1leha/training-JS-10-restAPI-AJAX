import lodash from 'lodash';
import { markupHtmlElement } from './markupHtmlElement';

export const renderSubList = ({ key, value }) => {
  if (
    lodash.isArray(value) ||
    lodash.isPlainObject(value) ||
    lodash.isObject(value)
  ) {
    //! step of recurtion --------------------------------------

    const subValueList = value.map(subValue => {
      return renderSubList(subValue);
    });

    const outerLi = markupHtmlElement(key, '');
    outerLi.className = 'keys__item';
    const outerUl = document.createElement('ul');

    outerLi.append(outerUl);
    outerUl.append(...subValueList);

    return outerLi;
  } else {
    //! base of recurtion --------------------------------------

    const innerLi = markupHtmlElement(key, value);
    innerLi.className = 'keys__subitem';

    return innerLi;
  }
};
