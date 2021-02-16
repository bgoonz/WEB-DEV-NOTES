import { defineMessages } from "react-intl";

const messages = defineMessages({
  notInstalled: {
    id: "dependencyChecker.notInstalledMessage",
    defaultMessage: "{name} {version} not detected. Click to install.",
  },
  iconAltMessage: {
    id: "dependencyChecker.iconAltMessage",
    defaultMessage: "Notification",
  },
});
export default messages;
