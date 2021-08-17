const input = require('./getInputConfig');
const getActionButtonsConfig = require('./getActionsbuttonsConfig');
const getBannerConfig = require('./getBannerConfig');

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
      input({ id: `filter-input` }), 
      getActionButtonsConfig()
    ]
  },
  getBannerConfig(`Loading . . .`, `request-status-banner`),
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
        class: `grey-222`,
        id: `data-table-body`
      }
    ]
  }
]
}, customConfig);
