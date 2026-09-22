import type { ReactElement } from 'react';
import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offersCount: number;
};

function App({ offersCount }: AppProps): ReactElement {
  return (
    <MainPage offersCount={offersCount} />
  );
}

export default App;
