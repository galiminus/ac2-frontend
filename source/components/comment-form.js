import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";
import { FormattedMessage } from "react-intl";

import {
    TextField,
    RaisedButton
} from "material-ui";

import { comments } from "api";
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
        error: PropTypes.string,
        postId: PropTypes.string.isRequired
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

        let commentButton;
        if (body.dirty) {
            commentButton = (
                <div className="row end-xs" style={{ padding: 8 }}>
                    <RaisedButton
                        style={{ marginLeft: 8 }}
                        disabled={body.invalid}
                        type="submit"
                        label={<FormattedMessage id="actions.comment" />}
                        secondary
                        onClick={handleSubmit(this.post)}
                    />
                </div>
            );
        } else {
            commentButton = <div />;
        }

        return (
            <form onSubmit={handleSubmit(this.post)}>
                <TextField
                    fullWidth
                    type="text"
                    multiLine
                    rows={1}
                    hintText={<FormattedMessage id="labels.comment" />}
                    {...body}
                />
                {commentButton}
            </form>
        );
    }
});

export default reduxForm({
    form: "comment",
    fields: ["body"],
    validate
})(form);
