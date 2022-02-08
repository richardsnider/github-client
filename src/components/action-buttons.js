const button = require('./button');

/** 
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `action-buttons`,
  children: [
    button(`refresh`, {
      onclick: () => {
        const targetDirectory = new URLSearchParams(location.search).get(`directory`) || ``;
        const event = new CustomEvent(`LOAD_DATA`, { detail: targetDirectory });
        document.dispatchEvent(event)
      }
    }),
    button(`add`),
    button(`remove`),
    button(`sort-down`)
  ]
}, customConfig);