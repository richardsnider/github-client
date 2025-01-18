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
  const content = newElement(document.body, {
    children: {
      "banner": banner(messages.bannerMessage, `welcome-banner`),
      "header": header(),
      "menu": menu(),
      "notification": notifications(),
      "settings": settings(),
      "mainRow": mainRow(),
      "footer": footer()
    }
  });

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
