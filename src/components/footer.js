const svg = require('./svg');

/** 
 * @param {import('@vorprog/elemancer').ElementConfig} customConfig
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `footer`,
  class: `grey row`,
  children: [{
    children: [
      {
        tag: `a`,
        href: `https://linkedin.com/in/${window.env.LINKEDIN_USERNAME}`,
        rel: `noreferrer noopener`,
        children: [svg(`linkedin`, { fill: `#BBB` })]
      },
      {
        tag: `a`,
        href: `https://github.com/${window.env.GITHUB_USERNAME}`,
        rel: `noreferrer noopener`,
        children: [svg(`github`, { fill: `#BBB` })]
      },
      { textContent: `Created by ${window.env.GITHUB_USERNAME}` }
    ]
  }
  ]
}, customConfig);
