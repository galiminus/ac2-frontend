import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';

const defaultProps = {
    record: ''
};

const StringField = React.createClass({
    propTypes: {
        schema: PropTypes.object.isRequired,
        record: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        translateLabel: PropTypes.bool
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return {
            edit: false,
            mouseInside: false
        };
    },

    setMouseInside() {
        this.setState({ mouseInside: true });
    },

    setMouseOutside() {
        this.setState({ mouseInside: false });
    },

    switchToEditMode() {
        if (!this.state.mouseInside && this.props.editable) {
            this.setState({
                edit: true,
                mouseInside: true,
                value: this.props.record.slice()
            });
        }
    },

    switchToValueMode() {
        if (!this.state.mouseInside) {
            this.setState({ edit: false });
        }
    },

    handleChange(event) {
        this.setState({ value: event.target.value });
    },

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.setState({ edit: false, mouseInside: false });
            return (this.props.onChange(this.state.value));
        }
    },

    renderEdit() {
        const valueField = (
            <ListItem
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <TextField
                        ref="valueField"
                        value={this.state.value}
                        onBlur={this.switchToValueMode}
                        fullWidth
                        hintText={this.props.title}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />
                }
            />
        );

        setTimeout(() => { this.refs.valueField.focus(); }, 1);
        return (valueField);
    },

    renderValue() {
        let secondaryText;

        if (this.props.record) {
            secondaryText = (
                <p>
                    {this.props.record}
                </p>
            );
        } else {
            secondaryText = <p>{this.context.translation.t('texts.emptyField')}</p>;
        }

        return (
            <ListItem
                disabled={!this.props.editable}
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.title}
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

export default StringField;
