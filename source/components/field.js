import React, { PropTypes } from "react";
import { reduxForm } from "redux-form";

import {
    ListItem,
    TextField
} from "material-ui";

import { validateText } from "validators";

const validate = (values) => {
    return {
        value: validateText(values.value)
    };
};

const Field = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        field: PropTypes.string.isRequired,
        values: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        error: PropTypes.string,
        label: PropTypes.string.isRequired,
        translations: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    },

    getInitialState() {
        return { edit: false, mouseInside: false };
    },

    setMouseInside() {
        this.setState({ mouseInside: true });
    },

    setMouseOutside() {
        this.setState({ mouseInside: false });
    },

    switchToEditMode() {
        if (!this.state.mouseInside) {
            this.setState({ edit: true, mouseInside: true });
        }
    },

    switchToValueMode() {
        if (!this.state.mouseInside) {
            this.setState({ edit: false });
        }
    },

    update() {
        this.props.onChange(this.props.fields.value.value);
        this.setState({ edit: false, mouseInside: false });
    },

    renderEdit() {
        const {
            fields: { value },
            handleSubmit
        } = this.props;

        const valueField = (
            <ListItem
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <form onSubmit={handleSubmit(this.update)}>
                        <TextField
                            ref="valueField"
                            {...value}
                            onBlur={this.switchToValueMode}
                            fullWidth
                            hintText={this.props.translations.t(this.props.label)}
                        />
                    </form>
                }
            />
        );

        setTimeout(() => { this.refs.valueField.focus(); }, 1);
        return (valueField);
    },

    renderValue() {
        let secondaryText;

        if (this.props.values.value) {
            switch (this.props.type) {
            case "string":
            case "country":
                secondaryText = (
                    <p>
                        {this.props.values.value}
                    </p>
                );
                break;
            default:
                secondaryText = <div />;
            }
        } else {
            secondaryText = <p>{this.props.translations.t("texts.emptyField")}</p>;
        }

        return (
            <ListItem
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.translations.t(this.props.label)}
                secondaryText={secondaryText}
                onTouchTap={this.switchToEditMode}
            />
        );
    },

    render() {
        return (this.state.edit ? this.renderEdit() : this.renderValue());
    }
});

export default reduxForm({
    form: "field",
    fields: ["value"],
    validate
})(Field);