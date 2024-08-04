import React from 'react';
import Theme from './common/styles/Theme';
import Router from './Router';
import { QueryClientProvider, QueryClient } from 'react-query';
import queryClientDefaultOptions from './songyi/constants/queryClientDefaultOptions';

function App() {
  const queryClient = new QueryClient(queryClientDefaultOptions);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Theme>
          <Router />
        </Theme>
      </QueryClientProvider>
    </div>
  );
}

export default App;
