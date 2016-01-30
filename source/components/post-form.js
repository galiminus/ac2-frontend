import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";

import {
    TextField,
    RaisedButton
} from "material-ui";

import api from "api";
import { addResource } from "action-creators";
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

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            imagesModalOpen: false,
            pollModalOpen: false
        };
    },

    post(fields, dispatch) {
        api.posts.create({
            type: "text",
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
            <form onSubmit={handleSubmit(this.post)}>
                <TextField
                    fullWidth
                    type="text"
                    multiLine
                    rows={3}
                    {...body}
                />
                <div className="row end-xs" style={{ padding: 8 }}>
                    <RaisedButton
                        style={{ marginLeft: 8 }}
                        disabled={body.invalid}
                        type="submit"
                        label={this.context.translation.t("actions.post")}
                        secondary
                        onClick={handleSubmit(this.post)}
                    />
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: "post",
    fields: ["body"],
    validate
})(form);
