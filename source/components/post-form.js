import React, { PropTypes } from "react";
import { reduxForm, reset } from "redux-form";

import {
    TextField,
    RaisedButton
} from "material-ui";

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
        translations: PropTypes.object.isRequired,
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
                        label={this.props.translations.t("actions.post")}
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
