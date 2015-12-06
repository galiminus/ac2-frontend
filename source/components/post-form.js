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
  Dialog
} from 'material-ui'

import DropZone from "react-dropzone"

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

  getInitialState() {
    return {
      imagesModalOpen: false,
      pollModalOpen: false
    }
  },

  componentWillReceiveProps(props) {
    if (props.error) {
      this.refs.notice.show()
    }
  },

  onDropImage(e) {
    console.log(e)
  },

  render: function() {
    const {
      fields: { body },
      handleSubmit,
      error
    } = this.props

    const dropZoneStyle = {
      background: "rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      padding: "64px 96px",
      display: "flex"
    }

    return(
      <form onSubmit={handleSubmit(post)}>
        <TextField fullWidth={true}
          type="text"
          multiLine={true}
          rows={3}
          {...body} />
        <div className="row end-xs" style={{padding: 8}}>
          <FlatButton
            style={{marginRight: 8}}
            onTouchTap={() => this.setState({pollModalOpen: true})}
            label={<FormattedMessage id="actions.addPoll" />} />
          <FlatButton
            style={{marginRight: 8}}
            onTouchTap={() => this.setState({imagesModalOpen: true})}
            label={<FormattedMessage id="actions.addImages" />} />
          <RaisedButton
            disabled={body.invalid}
            type="submit"
            label={<FormattedMessage id="actions.post" />}
            secondary={true}
            onTouchTap={handleSubmit(post)} />
        </div>
        <Snackbar message={error ? <FormattedMessage id={`errors.${error}`} /> : ""} ref="notice" />

        <Dialog open={this.state.pollModalOpen}>
          LOL
        </Dialog>

        <Dialog
          open={this.state.imagesModalOpen}
          title={"LOL"}
          actions={[
            <FlatButton
              label={<FormattedMessage id="actions.cancel" />}
              secondary={true}
              onTouchTap={() => this.setState({imagesModalOpen: false})} />,
            <FlatButton
              label={<FormattedMessage id="actions.submit" />}
              primary={true}
              onTouchTap={this._handleCustomDialogSubmit} />]}>
          <DropZone onDrop={this.onDropImage} style={dropZoneStyle} className="row middle-xs center-xs">
            <FormattedMessage id="labels.imageUploadDropZone"  />
          </DropZone>
        </Dialog>
      </form>

    )
  }
})

export default reduxForm({
  form: "post",
  fields: ['body'],
  validate
})(form)
