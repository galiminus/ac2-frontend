import React from "react"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

import ReactDOM from "react-dom"

import { Router, Route } from 'react-router'

import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

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

const Application = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme({
        spacing: Spacing,
        fontFamily: 'Roboto, sans-serif',
        palette: {
          primary1Color: Colors.indigo400,
          primary2Color: Colors.cyan700,
          primary3Color: Colors.grey400,
          accent1Color: Colors.orangeA700,
          accent2Color: Colors.grey100,
          accent3Color: Colors.grey500,
          textColor: Colors.darkBlack,
          alternateTextColor: Colors.white,
          canvasColor: Colors.white,
          borderColor: Colors.grey300,
          disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
        }
      })
    };
  },

  render() {
    return (
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
    )
  }
})

ReactDOM.render(<Application />, document.getElementsByTagName("main")[0])
