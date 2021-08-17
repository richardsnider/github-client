const getButtonConfig = require('./getButtonConfig');

/**
 * @param {string} id
 * @param {import('../actions/makeGithubContentsRequest').GithubResponse} data
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
module.exports = (id, data) => Object.assign({
  tag: `tr`,
  onclick: (event) => event.target.parentElement.classList.toggle(`blue-35a`), // event.target is cell element, use parent to highlight entire row
  id: id,
  children: [
    {
      tag: `td`,
      class: `padded grey-border`,
      children: [ data.type === `dir` ?
        getButtonConfig(`folder`, {
          height: `20px`,
          width: `20px`,
          onclick: () => {
            const event = new CustomEvent(`LOAD_DATA`, { detail: data.path });
            document.dispatchEvent(event)
          }
        }) :
        getButtonConfig(`view`, {
          height: `20px`,
          width: `20px`,
          href: data.path
        })
      ]
    },
    {
      tag: `td`,
      class: `padded grey-border`,
      children: [
        {
          tag: `a`,
          href: data.type === `dir` ? data.html_url : data.download_url,
          target: `_blank`,
          textContent: data.name
        }
      ]
    },
    {
      tag: `td`,
      class: `padded grey-border`,
      textContent: data.type
    },
    {
      tag: `td`,
      class: `padded grey-border`,
      children: [{
        textContent: `${data.size}`
      }]
    },
    {
      tag: `td`,
      class: `padded grey-border`,
      children: [{
        textContent: data.sha
      }]
    }
  ]
});
