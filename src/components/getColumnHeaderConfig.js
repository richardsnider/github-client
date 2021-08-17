const button = require('./getButtonConfig');

/**
 * @param {string} columnName
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
module.exports = (columnName) => ({
  tag: `th`,
  id: `${columnName}-header`,
  children: [
    {
      class: `padded resizable`,
      textContent: `${columnName}`,
      children: [
        button(`sort`)
      ]
    },
  ]
});
