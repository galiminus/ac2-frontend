import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";

import {
    TextField
} from "material-ui";

import { comments } from "api";
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
        currentUserPage: PropTypes.object.isRequired,
        error: PropTypes.string,
        postId: PropTypes.string.isRequired,
        translations: PropTypes.object.isRequired
    },

    post(fields, dispatch) {
        comments.create(this.props.postId, {
            type: "text",
            data: {
                body: fields.body
            }
        }).then(() => dispatch(reset("comment")));
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
            <form onSubmit={handleSubmit(this.post)} {...this.props} >
                <div className="row middle-xs">
                    <div>
                        <UserAvatar page={this.props.currentUserPage} />
                    </div>
                    <div className="col-xs">
                        <TextField
                            style={{ fontSize: "1em" }}
                            fullWidth
                            type="text"
                            hintText={this.props.translations.t("labels.comment")}
                            {...body}
                        />
                    </div>
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
