import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';

import { validateText } from 'validators';

const validate = (values) => {
    return {
        value: validateText(values.value)
    };
};

const StringField = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        error: PropTypes.string,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

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
        if (!this.state.mouseInside && this.props.editable) {
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

    renderField() {
        return (
            <TextField
                ref="valueField"
                {...this.props.fields.value}
                onBlur={this.switchToValueMode}
                fullWidth
                hintText={this.props.translation.t(this.props.label)}
            />
        );
    },

    renderEdit() {
        const valueField = (
            <ListItem
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <form onSubmit={this.props.handleSubmit(this.update)}>
                        {this.renderField()}
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
            switch (this.props.schema.type) {
            case 'string':
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
            secondaryText = <p>{this.props.translation.t('texts.emptyField')}</p>;
        }

        return (
            <ListItem
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.translation.t(this.props.label)}
                secondaryText={secondaryText}
                onTouchTap={this.switchToEditMode}
                rightIcon={this.props.editable ? <EditIcon /> : undefined}
            />
        );
    },

    render() {
        return (this.state.edit ? this.renderEdit() : this.renderValue());
    }
});

export default reduxForm({
    form: 'field',
    fields: ['value'],
    validate
})(StringField);
