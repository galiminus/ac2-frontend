import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import moment from 'moment';

import ListItem from 'material-ui/List/ListItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import InputTitle from './input-title';

import { translateErrors } from 'utils/errors';

const DateTimeField = React.createClass({
    propTypes: {
        schema: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        record: PropTypes.string,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        translateLabel: PropTypes.bool
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            errors: { values: [] }
        });
    },

    handleDayChange(_event, date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateOfMonth = date.getDate();

        const newDate = moment(this.props.record).year(year).month(month).date(dateOfMonth);
        return (this.props.onChange(newDate.format()));
    },

    handleHourChange(_event, date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const newDate = moment(this.props.record).hours(hours).minutes(minutes);
        return (this.props.onChange(newDate.format()));
    },

    renderEdit() {
        const valueField = (
            <ListItem
                disabled
                primaryText={
                    <div>
                        <InputTitle>
                            {this.props.title}
                        </InputTitle>
                        <DatePicker
                            fullWidth
                            hintText={`${this.props.label}.date`}
                            value={this.props.record && new Date(this.props.record)}
                            mode="landscape"
                            onChange={this.handleDayChange}
                            errorText={translateErrors(this.props.errors.values, this.context.translation)}
                        />
                        <TimePicker
                            fullWidth
                            hintText={`${this.props.label}.time`}
                            value={this.props.record && new Date(this.props.record)}
                            format="24hr"
                            onChange={this.handleHourChange}
                            errorText={translateErrors(this.props.errors.values, this.context.translation)}
                        />
                    </div>
                }
            />
        );
        return (valueField);
    },

    renderValue() {
        let secondaryText;

        if (this.props.record) {
            secondaryText = <p>{this.props.record}</p>;
        } else {
            secondaryText = <p>{this.context.translation.t('texts.emptyField')}</p>;
        }

        return (
            <ListItem
                disabled={!this.props.editable}
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.title}
                secondaryText={secondaryText}
            />
        );
    },

    render() {
        return (this.props.editable ? this.renderEdit() : this.renderValue());
    }
});

export default DateTimeField;
