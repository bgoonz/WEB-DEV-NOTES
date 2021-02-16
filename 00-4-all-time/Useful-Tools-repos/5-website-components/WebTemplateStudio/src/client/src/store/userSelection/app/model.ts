import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";
import { IValidation } from "../../../utils/validations/validations";

export interface ISelectProjectTypeAction {
  type: USERSELECTION_TYPEKEYS.SELECT_WEB_APP;
  payload: ISelected;
}

export interface ISetProjectNameActionType {
  type: USERSELECTION_TYPEKEYS.SET_PROJECT_NAME;
  payload: IProjectName;
}

export interface IUpdateProjectPathActionType {
  type: USERSELECTION_TYPEKEYS.SET_OUTPUT_PATH;
  payload: string;
}

export interface IProjectPathValidation {
  isInvalidProjectPath?: boolean;
  projectPathError?: string;
}

export interface IProjectName {
  projectName: string;
  validation: IValidation;
}

export interface IOutputPath {
  outputPath: string;
  validation?: IValidation;
}
