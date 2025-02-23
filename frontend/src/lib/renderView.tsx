import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { ProviderReactQuery } from "./ProviderReactQuery";

export const renderView = (Element: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ProviderReactQuery>
        {Element}
      </ProviderReactQuery>
    </MemoryRouter>
  );
};