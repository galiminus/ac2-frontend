import FlexBoxGrid from "flexboxgrid"

import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { IntlProvider } from 'react-intl';

import Application from "components/application"

import Store from "store"

import messages from "messages/fr-FR"

ReactDOM.render(
  <Provider store={Store}>
    <IntlProvider locale="fr" messages={messages}>
      <Application />
    </IntlProvider>
  </Provider>,
document.getElementsByTagName("main")[0])
