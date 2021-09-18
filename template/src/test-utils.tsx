import React from 'react';
import { AnyAction, Store } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './app/store';

const AllProviders: React.FC<{ store: Store<any, AnyAction> }> = ({
  store,
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

function customRender(
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'queries'> = {}
) {
  const store = createStore();

  return render(ui, {
    wrapper: (props) => <AllProviders store={store} {...props} />,
    ...options,
  });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
