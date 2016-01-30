import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";

import {
    TextField,
    FlatButton
} from "material-ui";

import api from "api";
import { validateText } from "validators";

import UserAvatar from "components/user-avatar";

const validate = values => {
    return {
        body: validateText(values.body)
    };
};

const form = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string,
        postId: PropTypes.string.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    post(fields, dispatch) {
        api.comments.create(this.props.postId, {
            type: "text",
            data: {
                body: fields.body
            }
        }).then((response) => {
            dispatch([reset("comment"), this.props.addResource(response)]);
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

        let commentButton = null;
        if (body.active || body.value.length > 0) {
            commentButton = (
                <FlatButton
                    labelStyle={{ padding: "0 8px" }}
                    disabled={body.invalid}
                    type="submit"
                    label={this.context.translation.t("actions.comment")}
                    secondary
                    onClick={handleSubmit(this.post)}
                />
            );
        }

        return (
            <form onSubmit={handleSubmit(this.post)} {...this.props} >
                <div className="row middle-xs">
                    <div>
                        <UserAvatar page={this.context.currentUserPage} />
                    </div>
                    <div className="col-xs">
                        <TextField
                            style={{ fontSize: "1em" }}
                            fullWidth
                            type="text"
                            hintText={this.context.translation.t("labels.comment")}
                            {...body}
                        />
                    </div>
                </div>
                <div className="row middle-xs end-xs">
                    {commentButton}
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: "comment",
    fields: ["body"],
    validate
})(form);
