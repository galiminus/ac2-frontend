import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import SaveIcon from 'material-ui/svg-icons/content/save';

import FloatingActionButton from 'components/floating-action-button';

import Field from 'components/field/field';

const defaultProps = {
    schema: {
        properties: {}
    },
    record: {}
};

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
        return (defaultProps);
    },

    getInitialState() {
        return ({ record: this.props.record, loading: false });
    },

    handleUpdate(category, record) {
        const newRecord = Object.assign({}, this.state.record);
        newRecord[category] = record;

        this.setState({ record: newRecord });
        return (this.props.onChange && this.props.onChange(newRecord));
    },

    handleSubmit() {
        this.setState({ loading: true });
        this.props.onSubmit(this.state.record).then(() => {
            this.setState({ loading: false });
        });
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
                    title={this.context.translation.t(`${this.props.label}.${category}`)}
                    record={this.state.record[category]}
                    schema={this.props.schema.properties[category]}
                    onUpdate={this.handleUpdate}
                    onChange={(record) => this.handleUpdate(category, record)}
                    editable={this.props.editable}
                />
            );
        }
        return (
            <div>
                {cards}
                {this.props.editable &&
                    <FloatingActionButton loading={this.state.loading} onMouseUp={this.handleSubmit}>
                        <SaveIcon />
                    </FloatingActionButton>
                }
            </div>
        );
    }
});

export default Form;
