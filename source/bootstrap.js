import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { IntlProvider } from 'react-intl';

import Application from "components/application"

import Store from "store"

ReactDOM.render(
  <Provider store={Store}>
    <IntlProvider locale="en">
      <Application />
    </IntlProvider>
  </Provider>,
document.getElementsByTagName("main")[0])
