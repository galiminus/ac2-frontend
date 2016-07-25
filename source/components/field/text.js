import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ListItem from 'material-ui/List/ListItem';
import MaterialTextField from 'material-ui/TextField';

const defaultProps = {
    record: ''
};

const TextField = React.createClass({
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
            edit: false
        };
    },

    switchToEditMode() {
        if (this.props.editable) {
            this.setState({
                edit: true,
                mouseInside: true,
                value: this.props.record.slice()
            });
        }
    },

    switchToValueMode() {
        this.setState({ edit: false });
    },

    handleChange(event) {
        this.setState({ value: event.target.value });
    },

    handleUpdate() {
        this.setState({ edit: false });
        return (this.props.onChange(this.state.value));
    },

    renderEdit() {
        const valueField = (
            <ListItem
                disabled={this.state.edit}
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <div>
                        <MaterialTextField
                            multiLine
                            rows={2}
                            ref="valueField"
                            value={this.state.value}
                            fullWidth
                            hintText={this.props.title}
                            onChange={this.handleChange}
                            onBlur={this.switchToValueMode}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <FlatButton
                                label={this.context.translation.t('actions.cancel')}
                                onClick={this.switchToValueMode}
                            />
                            <FlatButton
                                type="submit"
                                label={this.context.translation.t('actions.update')}
                                onTouchTap={this.handleUpdate}
                                secondary
                            />
                        </div>
                    </div>
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

export default TextField;
