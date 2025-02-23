import { MemoryRouter } from "react-router-dom";
import { ProviderReactQuery } from "./ProviderReactQuery";
import { renderHook } from "@testing-library/react";

export const renderHookWithProviders = <T, P>(
  hook: (props: P) => T,
  options?: { initialProps?: P }
) => {
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <ProviderReactQuery>{children}</ProviderReactQuery>
      </MemoryRouter>
    ),
    ...options,
  });
};