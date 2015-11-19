import React from "react"
import ReactDOM from "react-dom"

import { Router, Route } from 'react-router'

import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'

import HomePage from "components/home-page"
import LoginPage from "components/login-page"

import FlexBoxGrid from "flexboxgrid"

import { Provider } from "react-redux"
import { IntlProvider } from 'react-intl';

import store from "store"

import messages from "messages/fr-FR"

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

const history = createBrowserHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <div>
    <Provider store={store}>
      <IntlProvider locale="fr" messages={messages}>
        <Router history={history}>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Router>
      </IntlProvider>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
    </DebugPanel>
  </div>
  ,
document.getElementsByTagName("main")[0])
