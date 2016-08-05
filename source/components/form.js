import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Field from 'components/field/field';

import { validate } from 'jsonschema';

const Form = React.createClass({
    propTypes: {
        record: PropTypes.object.isRequired,
        style: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        only: PropTypes.array
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            record: {},
            style: {}
        });
    },

    getInitialState() {
        return ({
            record: this.props.record,
            pristine: true,
            errors: this.validate(this.props.record)
        });
    },

    componentDidMount() {
        this.props.onChange(this.state.record, this.state.errors);
    },

    componentWillReceiveProps(props) {
        if (this.props.record !== props.record) {
            this.setState({ record: props.record });
        }
    },

    handleUpdate(category, record) {
        const newRecord = { ...this.state.record };
        newRecord[category] = record;

        const errors = this.validate(newRecord);
        this.setState({
            record: newRecord,
            pristine: false,
            errors
        });

        return (this.props.onChange(newRecord, errors));
    },

    validate(record) {
        const errors = {};
        const validation = validate(record, this.props.schema);

        for (const error of validation.errors) {
            const propertiesPath = error.property.replace(/^instance\./, '').split('.');

            let tmpErrorPath = errors;
            for (const propertyPath of propertiesPath) {
                if (!tmpErrorPath[propertyPath]) {
                    tmpErrorPath[propertyPath] = { values: [] };
                }
                tmpErrorPath = tmpErrorPath[propertyPath];
            }
            tmpErrorPath.values.push(error);
        }
        return (errors);
    },

    render() {
        const cards = [];

        for (const category of Object.keys(this.props.schema.properties)) {
            if (this.props.only && this.props.only.indexOf(category) < 0) {
                continue;
            }

            cards.push(
                <Field
                    key={category}
                    label={`${this.props.label}.${category}`}
                    title={this.context.translation.t(`${this.props.label}.${category}.label`)}
                    record={this.state.record[category]}
                    schema={this.props.schema.properties[category]}
                    onChange={(record) => this.handleUpdate(category, record)}
                    editable={this.props.editable}
                    errors={this.state.errors[category]}
                />
            );
        }
        return (
            <form style={this.props.style}>
                {cards}
            </form>
        );
    }
});

export default Form;
