import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import List from 'material-ui/List';
import { Card, CardHeader } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Field from 'components/field/field';

const ObjectField = React.createClass({
    propTypes: {
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        record: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        depth: PropTypes.number.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            record: {},
            errors: { values: [] }
        });
    },

    handleChange(field, record) {
        const newRecord = Object.assign({}, this.props.record);
        newRecord[field] = record;

        return (this.props.onChange(newRecord));
    },

    render() {
        const fields = [];
        for (const field of Object.keys(this.props.schema.properties)) {
            fields.push(
                <Field
                    label={this.props.label}
                    title={this.context.translation.t(`${this.props.label}.${field}`)}
                    record={(this.props.record || {})[field]}
                    schema={this.props.schema.properties[field]}
                    errors={this.props.errors[field]}
                    key={field}
                    onChange={(record) => this.handleChange(field, record)}
                    editable={this.props.editable}
                    depth={this.props.depth}
                />
            );
        }
        if (this.props.depth === 1) {
            return (
                <Card
                    style={{ margin: '24px 0', fontSize: '0.9em', lineHeight: '1.4em' }}
                    key={this.props.label}
                >
                    <CardHeader
                        title={this.props.title}
                    />
                    <Divider inset />
                    {fields}
                </Card>
            );
        }

        return (
            <List>
                <Subheader>{this.props.title}</Subheader>
                {fields}
            </List>
        );
    }
});

export default ObjectField;
