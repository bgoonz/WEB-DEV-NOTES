import { EXTENSION_COMMANDS } from "../constants/commands";
import fs = require("fs");
import path = require("path");
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { MESSAGES } from "../constants/messages";

export class Validator extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION, Validator.handleProjectPathValidation],
  ]);

  public static async handleProjectPathValidation(message: any): Promise<IPayloadResponse> {
    const projectPath = message.projectPath;
    const projectName = message.projectName;

    let projectPathError = "";
    let isInvalidProjectPath = false;

    const validationObject = Validator.isValidProjectPath(projectPath, projectName);

    projectPathError = validationObject.error;
    isInvalidProjectPath = !validationObject.isValid;

    return {
      payload: {
        projectPathValidation: {
          isValid: !isInvalidProjectPath,
          error: projectPathError,
        },
      },
    };
  }

  private static isValidProjectPath = (path: string, name: string): any => {
    let isValid = true;
    let error = "";

    if (
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(
        path
      )
    ) {
      error = MESSAGES.ERRORS.PATH_WITH_EMOJIS(path);
      isValid = false;
    }
    if (!fs.existsSync(path) && path !== "") {
      error = MESSAGES.ERRORS.INVALID_OUTPUT_PATH(path);
      isValid = false;
    } else if (name !== "" && !Validator.isUniquePath(path, name)) {
      error = MESSAGES.ERRORS.PROJECT_PATH_EXISTS(path, name);
      isValid = false;
    }
    return {
      isValid: isValid,
      error: error,
    };
  };

  private static isUniquePath = (projectPath: string, name: string): boolean => {
    return !fs.existsSync(path.join(projectPath, name));
  };
}
