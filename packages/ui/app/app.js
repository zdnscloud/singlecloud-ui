/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for async function to generator support
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// offline cache support
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/logo.svg';
/* eslint-enable import/no-unresolved, import/extensions */

import store from './store';

// Import i18n messages
import { translationMessages } from './i18n';

const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import(/* webpackChunkName: "intl" */ 'intl'));
  })
    .then(() => (
      Promise.all([
        import(
          /* webpackChunkName: "intl.zh" */ 'intl/locale-data/jsonp/zh.js'
        ),
        import(
          /* webpackChunkName: "intl.en" */ 'intl/locale-data/jsonp/en.js'
        ),
      ])
    ))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
/* eslint-disable no-console */
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onInstalled: () => {
      console.log('App is ready for offline usage!');
    },
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });
}
/* eslint-enable no-console */
