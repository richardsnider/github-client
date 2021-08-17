/**
 * @param {HTMLElement} parent 
 */
module.exports = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  parent.innerHTML = ``;
};
