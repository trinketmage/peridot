import messages from "@/i18n/index";
import pathToRegexp from 'path-to-regexp'
const available = Object.keys(messages);


let locale = window.navigator.userLanguage || window.navigator.language;
if (available.indexOf(locale) === -1) {
  locale = "en";
}
const regexp = pathToRegexp('/:locale*')
const lang = regexp.exec(window.location.pathname)
if(lang && lang[1]) {
  locale = lang[1]
}
console.log(locale)
export default locale;
