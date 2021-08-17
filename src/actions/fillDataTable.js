const columnHeader = require('../components/getColumnHeaderConfig');
const util = require('../utilities/all');
const makeGithubContentsRequest = require('./makeGithubContentsRequest');
const getButtonConfig = require('../components/getButtonConfig');
const getRowDataConfig = require('../components/getDataRowConfig');

/**
 * @param {CustomEvent} loadDataEvent 
 * @returns {void}
 */
const fillDataTable = async (loadDataEvent) => {
  const path = loadDataEvent.detail || ``;
  const requestContentsTask = makeGithubContentsRequest(path);
  const requestStatusBanner = document.getElementById(`request-status-banner`);
  const requestStatusBannerMessage = document.getElementById(`request-status-banner-message`);
  requestStatusBanner.classList.remove(`hidden`);
  requestStatusBannerMessage.textContent = `Fetching ${path} . . .`;
  requestStatusBanner.style.backgroundColor = `grey`;

  const dataTableHead = document.getElementById(`data-table-head`);
  const dataTableBody = document.getElementById(`data-table-body`);
  util.clearElement(dataTableHead);
  util.clearElement(dataTableBody);

  const contentsResponse = await requestContentsTask;
  if (contentsResponse.status !== 200) {
    requestStatusBannerMessage.textContent = `Github returned status code ${contentsResponse.status} ${await contentsResponse.text()}`;
    requestStatusBanner.style.backgroundColor = `red`;
    return;
  }

  /** @type {Array<import('./makeGithubContentsRequest').GithubResponse>} */
  const contents = await contentsResponse.json()
  requestStatusBannerMessage.textContent = `${contents.length} results returned!`;
  requestStatusBanner.style.backgroundColor = `green`;

  const parentPath = path.substr(0, path.lastIndexOf(`/`) || path.length - 1);
  util.newElement(dataTableHead, {
    tag: `tr`,
    children: [
      {
        tag: `th`,
        class: `padded`,
        children: [
          getButtonConfig(`back`, {
            onclick: () => {
              const event = new CustomEvent(`LOAD_DATA`, { detail: parentPath });
              document.dispatchEvent(event)
            }
          })
        ]
      },
      columnHeader(`name`),
      columnHeader(`type`),
      columnHeader(`size`),
      columnHeader(`sha`),
    ]
  });

  util.loop(contents, (key, value) => 
    util.newElement(dataTableBody, getRowDataConfig(`data-row-${key}`, value))
  );
};

module.exports = fillDataTable;