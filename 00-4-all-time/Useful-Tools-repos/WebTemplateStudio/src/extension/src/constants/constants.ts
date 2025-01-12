export const CONSTANTS = {
  AZURE_LOGIN_STATUS: {
    LOGGED_IN: "LoggedIn",
    LOGGING_IN: "LoggingIn",
    INITIALIZING: "Initializing",
    LOGGED_OUT: "LoggedOut",
  },
  REACT_PANEL: {
    PROJECT_TITLE: "Microsoft Web Template Studio",
  },
  GENERATE_ENDPOINT: "/api/generate",
  ENGINE_DIRECTORY: "./src/api/darwin/CoreTemplateStudio.Api",
  COSMOSDB_MONGO: {
    CONNSTR: "COSMOSDB_CONNSTR",
    USER: "COSMOSDB_USER",
    PASSWORD: "COSMOSDB_PASSWORD",
  },
  COSMOSDB_SQL: {
    URI: "COSMOSDB_URI",
    PRIMARY_KEY: "COSMOSDB_PRIMARY_KEY",
  },
  SQL_CONNECTION_STRING_PREFIX: "accountendpoint=",
  ASPNET_BACKEND_FRAMEWORK_NAME: "AspNet",
  MAX_PROJECT_NAME_LENGTH: 50,
  START_PORT: 9502,
  VSCODE_COMMAND: {
    OPEN_FOLDER: "vscode.openFolder",
  },
  DEPENDENCY_CHECKER: {
    NODE: "node",
    PYTHON: "python",
    PYTHON3: "python3",
    PYTHON_LAUNCHER: "py -3",
    NETCORE: "netcore",
  },
  PACKAGE_SOURCES: {
    NPM: "npm",
    GITHUB: "github",
  },
  AZURE_LOCATION: {
    CENTRAL_US: "Central US",
  },
  APP_SERVICE_DOMAIN: ".azurewebsites.net",
  APP_NAME: {
    MAX_LENGTH: 60,
    MIN_LENGTH: 3,
  },
  APP_SERVICE_PLAN_NAME: {
    MAX_LENGTH: 40,
  },
  COSMOS_DB_NAME: {
    MAX_LENGTH: 31,
    MIN_LENGTH: 3,
  },
  DEPLOYMENT_NAME: {
    MAX_LENGTH: 64,
  },
  SKU_DESCRIPTION: {
    FREE: {
      capacity: 1,
      family: "F",
      name: "F1",
      size: "F1",
      tier: "Free",
    },
    BASIC: {
      capacity: 1,
      family: "B",
      name: "B1",
      size: "B1",
      tier: "Basic",
    },
  },
  VALIDATION_LIMIT: 3,
  TELEMETRY: {
    LAUNCH_WIZARD_STARTED_POINT: "Launch wizard",
  },
};

export const DEFAULT_PROJECT_NAME = "myApp";
export const PROJECT_NAME_VALIDATION_LIMIT = 50;

export const PAYLOAD_MESSAGES_TEXT = {
  RESET_PAGES_TEXT: "Sending reset pages request...",
  SWITCH_FRAMEWORKS_TEXT: "Sending framework change request...",
  SENT_GENERATION_INFO_TEXT: "Sending generation info...",
};

export enum AzureResourceType {
  AppService = "app-service",
  Cosmos = "cosmos",
  AppServicePlan = "app-service-plan",
}

export enum ENVIRONMENT {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test",
}

export enum PLATFORM {
  WEB = "Web",
  REACTNATIVE = "RN",
}

export enum OS {
  Linux = "linux",
  Windows = "windows",
}

export const VSCODE_TASKS = {
  INSTALL_DEPENDENCIES: "Install dependencies",
  PUBLISH: "Publish",
};
