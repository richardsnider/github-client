const input = require('./input');
const actionButtons = require('./action-buttons');
const banner = require('./banner');

/** 
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `main-row`,
  class: `row`,
  children: [{
    id: `action-bar`,
    class: `grey-444 row`,
    children: [
      actionButtons(),
      input({ id: `filter-input` })
    ]
  },
  banner(`Loading . . .`, `request-status-banner`),
  {
    tag: `table`,
    id: `data-table`,
    class: `row`,
    children: [
      {
        tag: `thead`,
        class: `grey-444`,
        id: `data-table-head`
      },
      {
        tag: `tbody`,
        id: `data-table-body`
      }
    ]
  }
  ]
}, customConfig);
