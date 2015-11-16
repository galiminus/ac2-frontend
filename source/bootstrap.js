import FlexBoxGrid from "flexboxgrid"

import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { IntlProvider } from 'react-intl';

import Application from "components/application"

import store from "store"

import messages from "messages/fr-FR"

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <IntlProvider locale="fr" messages={messages}>
        <Application />
      </IntlProvider>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>
  ,
document.getElementsByTagName("main")[0])
