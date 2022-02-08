const svg = require('./svg');

/** 
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `header`,
  class: `grey-666 row`,
  children: [{
    id: `left-header`,
    children: [
      {
        id: `home-button`,
        onclick: () => {
          const event = new CustomEvent(`LOAD_DATA`, { detail: `` });
          document.dispatchEvent(event)
        },
        children: [svg(`home`)]
      },
      {
        id: `menu-button`,
        onclick: () => document.getElementById(`menu`).classList.toggle(`hidden`),
        children: [svg(`menu`)]
      },
      {
        onclick: () => document.getElementById(`search`).classList.toggle(`hidden`),
        children: [svg(`search`)]
      }
    ]
  },
  {
    id: `right-header`,
    children: [
      {
        onclick: () => document.getElementById(`notifications`).classList.toggle(`hidden`),
        children: [svg(`notifications`)]
      },
      {
        onclick: () => document.getElementById(`settings`).classList.toggle(`hidden`),
        children: [svg(`settings`)]
      }
    ]
  }]
}, customConfig);
