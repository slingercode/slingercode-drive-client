import { ReactNode } from "react";

import Header from "./header";

type AppContainerProps = {
  children: ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => (
  <>
    <Header />

    <main className="">{children}</main>
  </>
);

export default AppContainer;
