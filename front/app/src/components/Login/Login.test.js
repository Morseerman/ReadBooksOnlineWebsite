import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Login } from "./Login";
import "@testing-library/jest-dom";
import LangWrapper from "../Wrapper/Wrapper";

describe("login component", () => {
  const component = render(
    <LangWrapper>
      <Login />
    </LangWrapper>
  );

  test("login form should render without error", () => {
    const theForm = component.getByTestId("form");
  });
});
