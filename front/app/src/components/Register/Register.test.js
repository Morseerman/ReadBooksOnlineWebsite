import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Register } from "./Register";
import "@testing-library/jest-dom";
import LangWrapper from "../Wrapper/Wrapper";

describe("register component", () => {
  const component = render(
    <LangWrapper>
      <Register />
    </LangWrapper>
  );

  test("register form should render without error", () => {
    const theForm = component.getByTestId("form");
  });
});
