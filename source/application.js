import React from "react"
import ReactDOM from "react-dom"

// import injectTapEventPlugin from "react-tap-event-plugin"
// injectTapEventPlugin()

import { Router, Route } from 'react-router'

import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'

import HomePage from "components/home-page"
import WelcomePage from "components/welcome-page"
import LoginForm from "components/login-form"
import SignupForm from "components/signup-form"
import RecoverForm from "components/recover-form"

import FlexBoxGrid from "flexboxgrid"

import { Provider } from "react-redux"
import { IntlProvider } from 'react-intl';

import store from "store"

import messages from "messages/fr-FR"

const history = createBrowserHistory()
syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="fr" messages={messages}>
      <Router history={history}>
        <Route path="/welcome" component={WelcomePage}>
          <Route path="login" component={LoginForm} />
          <Route path="recover" component={RecoverForm} />
          <Route path="signup" component={SignupForm} />
        </Route>
        <Route path="/" component={HomePage} />
      </Router>
    </IntlProvider>
  </Provider>
  ,
document.getElementsByTagName("main")[0])
