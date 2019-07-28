import messages from "@/i18n/index";
const available = Object.keys(messages);
let locale = window.navigator.userLanguage || window.navigator.language;
if (available.indexOf(locale) === -1) {
  locale = "en";
}
export default locale;
