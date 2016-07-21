import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Field from 'components/field/field';

const defaultProps = {
    schema: {
        properties: {}
    }
};

const Form = React.createClass({
    propTypes: {
        record: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        only: PropTypes.array
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    handleUpdate(category, record) {
        const newRecord = Object.assign({}, this.props.record);
        newRecord[category] = record;

        return (this.props.onChange(newRecord));
    },

    render() {
        const cards = [];

        for (const category of Object.keys(this.props.schema.properties)) {
            if (this.props.only && this.props.only.indexOf(category) < 0) {
                continue;
            }

            cards.push(
                <Field
                    label={`${this.props.label}.${category}`}
                    title={this.props.translation.t(`${this.props.label}.${category}`)}
                    record={this.props.record[category]}
                    schema={this.props.schema.properties[category]}
                    key={category}
                    onChange={(record) => this.handleUpdate(category, record)}
                    editable={this.props.editable}
                    translation={this.props.translation}
                />
            );
        }
        return (
            <div>
                {cards}
            </div>
        );
    }
});

export default Form;
