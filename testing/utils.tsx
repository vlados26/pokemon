import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderResult, cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

type SetupArguments = {
  Component: React.ElementType;
  defaultProps?: Record<string, any>;
  extraNodes: (container: RenderResult, props: Record<string, any>) => {};
};

type SetupCallbackArguments = {
  overrideProps: Record<string, any>;
  renderOptions: Record<string, any>;
};

export const createSetup =
  ({ Component, defaultProps, extraNodes = () => ({}) }: SetupArguments) =>
  (
    { overrideProps, renderOptions = {} }: SetupCallbackArguments = {} as SetupCallbackArguments
  ): any => {
    cleanup();

    jest.clearAllMocks();
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});

    const props = { ...defaultProps, ...overrideProps };
    const queryClient = new QueryClient();

    const container = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Component {...props} />
        </BrowserRouter>
      </QueryClientProvider>,
      { ...renderOptions }
    );

    return {
      container,
      props,
      ...extraNodes(container, props),
    };
  };
