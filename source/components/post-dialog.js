import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import { CardHeader } from "material-ui/Card";

import api from "api";
import { addResource } from "action-creators";
import { validateText } from "validators";

import PageCardHeader from "components/page-card-header";

const validate = values => {
    return {
        body: validateText(values.body)
    };
};

const form = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    post(fields, dispatch) {
        api.posts.create({
            type: "text",
            access_controls_attributes: [{ authorized_party_type: "All" }],
            data: {
                body: fields.body
            }
        }).then((response) => {
            dispatch([reset("post"), addResource(response)]);
        });
    },

    render() {
        const {
            fields: { body },
            handleSubmit
        } = this.props;

        if (!body.value) {
            body.value = "";
        }
        return (
            <Dialog
                {...this.props}
                title={
                    <PageCardHeader sender={this.props.sender} />
                }
                actions={[
                    <FlatButton
                        label={this.context.translation.t("actions.cancel")}
                        onClick={this.props.onRequestClose}
                    />,
                    <FlatButton
                        disabled={body.invalid}
                        type="submit"
                        label={this.context.translation.t("actions.post")}
                        secondary
                        onClick={handleSubmit(this.post)}
                    />
                ]}
            >
                <TextField
                    fullWidth
                    type="text"
                    multiLine
                    rows={3}
                    {...body}
                />
            </Dialog>
        );
    }
});

export default reduxForm({
    form: "post",
    fields: ["body"],
    validate
})(form);
