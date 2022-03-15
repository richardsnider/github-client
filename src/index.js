const newElement = require('@vorprog/elemancer');
const messages = require('./data/messages');
const banner = require('./components/banner');
const header = require('./components/header');
const menu = require('./components/menu');
const notifications = require('./components/notifications');
const settings = require('./components/settings');
const mainRow = require('./components/main-row');
const footer = require('./components/footer');
const fillDataTable = require('./actions/fillDataTable');
const updateQueryString = require('./utilities/updateQueryString');

const startup = async () => {
  console.log(`Document intialized.`);
  const bannerElement = newElement(document.body, banner(messages.bannerMessage, `welcome-banner`));
  const headerElement = newElement(document.body, header());
  const menuElement = newElement(document.body, menu());
  const notificationsElement = newElement(document.body, notifications());
  const settingsElement = newElement(document.body, settings());

  const mainRowElement = newElement(document.body, mainRow());
  const footerElement = newElement(document.body, footer());

  document.getElementById(`filter-input`).focus();

  document.addEventListener(`LOAD_DATA`, fillDataTable);
  document.addEventListener(`LOAD_DATA`, (event) => updateQueryString(`directory`, event.detail));
  const targetDirectory = new URLSearchParams(location.search).get(`directory`) || ``;
  const event = new CustomEvent(`LOAD_DATA`, { detail: targetDirectory });
  document.dispatchEvent(event);
};

(async () => {
  document.addEventListener(`DOMContentLoaded`, startup);
})();
