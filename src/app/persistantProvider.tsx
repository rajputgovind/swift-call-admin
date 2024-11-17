import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

interface PersistantProviderProps {
  children: ReactNode;
}

const PersistantProvider: React.FC<PersistantProviderProps> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default PersistantProvider;
