/** 
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `notifications`,
  class: `grey-333 hidden right-side popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `Notification 1`
  },
  {
    class: `grey-border padded`,
    textContent: `Notification 2`
  },
  {
    class: `grey-border padded`,
    textContent: `Notification 3`
  }]
}, customConfig);
