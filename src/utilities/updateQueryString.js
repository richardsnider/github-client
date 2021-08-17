/**
 * 
 * @param {string} key 
 * @param {string} value 
 * @returns {void}
 */
module.exports = (key, value) => {
  const params = new URLSearchParams(location.search);
  params.set(key, value);
  const newUrl = `${location.origin}${location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
};
