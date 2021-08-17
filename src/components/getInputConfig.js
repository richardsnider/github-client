/** 
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `input-filter`,
  class: `grey-222 padded curved input`,
  contenteditable: `true`,
  placeholder: `(work in progress) . . .`
}, customConfig);
