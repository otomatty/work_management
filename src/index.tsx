import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// i18nextの設定
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'ja',
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: [
      'layout',
      'login',
      'homePage',
      'calcGenerate',
      'studentInfo',
      'webSiteManagement',
      'workManagement',
      'workRecord',
      'components',
    ],
    defaultNS: 'pages',
    interpolation: {
      escapeValue: false,
    },
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
