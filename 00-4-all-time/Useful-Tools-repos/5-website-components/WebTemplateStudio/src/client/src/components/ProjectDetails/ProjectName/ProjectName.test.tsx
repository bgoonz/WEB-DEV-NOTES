import * as React from "react";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { RenderResult, act } from "@testing-library/react";

import { getInitialState } from "../../../mockData/mockStore";
import { renderWithStore } from "../../../testUtils";

import messages from "./messages";
import ProjectName from ".";
import { AppState } from "../../../store/combineReducers";

describe("Project Name component", () => {
  let store: any;
  let props: any;
  let wrapper: RenderResult;
  let initialState: AppState;

  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {};
    wrapper = renderWithStore(<ProjectName {...props} />, store);
  });

  it("renders without crashing", () => {
    act(() => {
      expect(wrapper).toBeDefined();
    });
  });

  it("should have project name title", () => {
    const expectedProjectNameTitle = intl.formatMessage(messages.projectNameTitle);
    expect(wrapper.getByText(expectedProjectNameTitle)).toBeDefined();
  });
});
