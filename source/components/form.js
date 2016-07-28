import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import SaveIcon from 'material-ui/svg-icons/content/save';

import FloatingActionButton from 'components/floating-action-button';

import Field from 'components/field/field';

import { validate } from 'jsonschema';

const Form = React.createClass({
    propTypes: {
        record: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        only: PropTypes.array
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            record: {}
        });
    },

    getInitialState() {
        return ({
            record: this.props.record,
            pristine: true,
            errors: this.validate(this.props.record),
            loading: false
        });
    },

    handleUpdate(category, record) {
        const newRecord = { ...this.state.record };
        newRecord[category] = record;

        this.setState({
            record: newRecord,
            pristine: false,
            errors: this.validate(newRecord)
        });

        return (this.props.onChange && this.props.onChange(newRecord));
    },

    handleSubmit() {
        this.setState({ loading: true });
        this.props.onSubmit(this.state.record).then(() => {
            this.setState({ loading: false });
        });
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
                    onUpdate={this.handleUpdate}
                    onChange={(record) => this.handleUpdate(category, record)}
                    editable={this.props.editable}
                    errors={this.state.errors[category]}
                />
            );
        }
        return (
            <form>
                {cards}
                {this.props.editable && Object.keys(this.state.errors).length === 0 &&
                    <FloatingActionButton loading={this.state.loading} onMouseUp={this.handleSubmit}>
                        <SaveIcon />
                    </FloatingActionButton>
                }
            </form>
        );
    }
});

export default Form;
