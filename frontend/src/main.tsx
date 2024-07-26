import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import { AppContextProvider } from './context/ctxt.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </AppContextProvider>
  </React.StrictMode>
);
