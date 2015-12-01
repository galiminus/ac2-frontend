import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage } from "react-intl"
import { updatePath } from 'redux-simple-router'

export const fields = ['body']

import {
  TextField,
  FlatButton,
  RaisedButton,
  Snackbar,
  Tabs,
  Tab
} from 'material-ui'

import { posts } from "api"
import { validateText } from "validators"

let post = (fields, dispatch) => {
  posts.create({
    type: "text",
    data: {
      body: fields.body
    }
  }, dispatch)
}

const validate = values => {
  return {
    body: validateText(values.body)
  }
}

let form = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  },

  componentWillReceiveProps(props) {
    if (props.error) {
      this.refs.notice.show()
    }
  },

  render: function() {
    const {
      fields: { body },
      handleSubmit,
      error
    } = this.props

    return(
      <form onSubmit={handleSubmit(post)}>
        <Tabs>
          <Tab label={<FormattedMessage id="labels.textPost" />}>
            <TextField fullWidth={true}
              type="text"
              multiLine={true}
              rows={4}
              {...body}
            />
          </Tab>
          <Tab label={<FormattedMessage id="labels.pollPost" />}>
            LOL
          </Tab>
        </Tabs>
        <div className="row end-xs" style={{marginTop: 16}}>
          <RaisedButton
            disabled={body.invalid}
            type="submit"
            label={<FormattedMessage id="actions.post" />}
            secondary={true}
            onTouchTap={handleSubmit(post)} />
        </div>
        <Snackbar message={error ? <FormattedMessage id={`errors.${error}`} /> : ""} ref="notice" />
      </form>

    )
  }
})

export default reduxForm({
  form: "post",
  fields: ['body'],
  validate
})(form)
