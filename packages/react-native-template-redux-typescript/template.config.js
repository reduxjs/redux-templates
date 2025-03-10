/**
 * Configuration settings for a React-Native template.
 *
 * @typedef {Object} TemplateConfig
 * @property {string} placeholderName A unique identifier or name for the placeholder within the template.
 * @property {string} templateDir The file path to the directory where the template is located.
 * @property {string} [postInitScript] The path to a script that should be executed after the template initialization is complete (optional).
 * @property {string} [titlePlaceholder] A placeholder for the title within the template (optional).
 */

/**
 * @type TemplateConfig
 */
const templateConfig = {
  placeholderName: "ReactNativeReduxTemplate",
  templateDir: "./template",
  titlePlaceholder: "react-native-template",
}

module.exports = templateConfig
