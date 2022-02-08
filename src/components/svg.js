/** 
 * @param {string} symbolName
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
 module.exports = (symbolName, customConfig = {}) => Object.assign({
  xmlns: `http://www.w3.org/2000/svg`,
  tag: `svg`,
  id: `${symbolName}-svg`,
  width: `40px`,
  height: `40px`,
  class: `padded`,
  viewBox: `0 0 24 24`,
  children: [{
    xmlns: `http://www.w3.org/2000/svg`,
    tag: `use`,
    href: `#${symbolName}-symbol`,
  }]
}, customConfig);
