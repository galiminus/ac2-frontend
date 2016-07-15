import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Chip from 'material-ui/Chip';

import ListItem from 'material-ui/List/ListItem';

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
        return { selected: null };
    },

    handleTouchTap(value) {
        this.props.onChange(value);
        this.setState({ selected: value });
    },

    renderField() {
        return (
            this.props.schema.enum.map((possibleValue) => {
                const isSelected = this.props.fields.value.value === possibleValue || this.state.selected === possibleValue;
                return (
                      <Chip
                          key={possibleValue}
                          style={{ margin: '4px 4px 4px 0', display: 'inline-block' }}
                          onTouchTap={() => this.handleTouchTap(possibleValue)}
                          backgroundColor={
                              isSelected ? '#999' : '#cacaca'
                          }
                      >
                          {this.props.translation.t(`${this.props.label}.${possibleValue}`)}
                      </Chip>
                );
            })
        );
    },

    renderEdit() {
        const valueField = (
            <ListItem
                disabled
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <div>
                        {this.props.translation.t(this.props.label)}
                        <div>
                            {this.renderField()}
                        </div>
                    </div>
                }
            />
        );
        return (valueField);
    },

    renderValue() {
        return (
            <ListItem
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.translation.t(this.props.label)}
                secondaryText={<p>{this.props.values.value || this.props.translation.t('texts.emptyField')}</p>}
            />
        );
    },

    render() {
        return (this.props.editable ? this.renderEdit() : this.renderValue());
    }
});

export default reduxForm({
    form: 'field',
    fields: ['value'],
    validate
})(StringField);
