import React from 'react';
import Main from '../components/pages/Main';

interface AppProps {
    cardsCount: number;
}

const App: React.FC<AppProps> = ({ cardsCount }) => (
  <Main cardsCount={cardsCount} />
);

export default App;
