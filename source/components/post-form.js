import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";
import { FormattedMessage } from "react-intl";

import {
    TextField,
    FlatButton,
    RaisedButton,
    Snackbar,
    Dialog
} from "material-ui";

import DropZone from "react-dropzone";

import { posts } from "api";
import { validateText } from "validators";

const validate = values => {
    return {
        body: validateText(values.body)
    };
};

const form = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    },

    getInitialState() {
        return {
            imagesModalOpen: false,
            pollModalOpen: false
        };
    },

    componentWillReceiveProps(props) {
        if (props.error) {
            this.refs.notice.show();
        }
    },

    handleDropImage() {
    },

    post(fields, dispatch) {
        posts.create({
            type: "text",
            data: {
                body: fields.body
            }
        }).then(() => dispatch(reset("post")));
    },

    render() {
        const {
            fields: { body },
            handleSubmit,
            error
        } = this.props;

        const dropZoneStyle = {
            background: "rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            padding: "64px 96px",
            display: "flex"
        };

        if (!body.value) {
            body.value = "";
        }
        return (
            <form onSubmit={handleSubmit(this.post)}>
                <TextField
                    fullWidth
                    type="text"
                    multiLine
                    rows={3}
                    {...body}
                />
                <div className="row end-xs" style={{ padding: 8 }}>
                    {/* <FlatButton
                        onClick={() => this.setState({ pollModalOpen: true })}
                        label={<FormattedMessage id="actions.addPoll" />}
                    />
                    <FlatButton
                        style={{ marginLeft: 8 }}
                        onClick={() => this.setState({ imagesModalOpen: true })}
                        label={<FormattedMessage id="actions.addImages" />}
                    /> */}
                    <RaisedButton
                        style={{ marginLeft: 8 }}
                        disabled={body.invalid}
                        type="submit"
                        label={<FormattedMessage id="actions.post" />}
                        secondary
                        onClick={handleSubmit(this.post)}
                    />
                </div>
                <Snackbar message={error ? <FormattedMessage id={`errors.${error}`} /> : ""} ref="notice" />

                <Dialog open={this.state.pollModalOpen}>
                    LOL
                </Dialog>

                <Dialog
                    open={this.state.imagesModalOpen}
                    style={{ position: "absolute" }}
                    title={"LOL"}
                    actions={[
                        <FlatButton
                            label={<FormattedMessage id="actions.cancel" />}
                            secondary
                            onClick={() => this.setState({ imagesModalOpen: false })}
                        />,
                        <FlatButton
                            label={<FormattedMessage id="actions.submit" />}
                            primary
                            onClick={this._handleCustomDialogSubmit}
                        />
                    ]}
                >
                    <DropZone onDrop={this.handleDropImage} style={dropZoneStyle} className="row middle-xs center-xs">
                        <FormattedMessage id="labels.imageUploadDropZone" />
                    </DropZone>
                </Dialog>
            </form>
        );
    }
});

export default reduxForm({
    form: "post",
    fields: ["body"],
    validate
})(form);
