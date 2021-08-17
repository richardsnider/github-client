// https://docs.github.com/en/rest/reference/repos#contents
const rootFolderUrl = `https://api.github.com/repos/${window.env.GITHUB_USERNAME}/${window.env.GITHUB_USERNAME}.github.io/contents`;

/**
 * @typedef {Object} GithubResponse
 * @property {string} path
 * @property {('dir'|'file'|'symlink')} type
 * @property {number} size
 * @property {sting} sha
 * @property {string} download_url
 * @property {sting} html_url
 */

/**
 * 
 * @param {string} path
 * @returns {Promise<Response>}
 */
module.exports = async (path = ``) => fetch(`${rootFolderUrl}/${path}`);
