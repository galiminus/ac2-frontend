import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import List from 'material-ui/List';
import { Card, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Field from 'components/field/field';

const defaultProps = {
    schema: {
        properties: {}
    }
};

const Form = React.createClass({
    propTypes: {
        record: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        const generateChangeHandler = (category, field) => {
            return (value) => {
                const data = Object.assign({}, this.props.record);
                if (!data[category]) {
                    data[category] = {};
                }
                data[category][field] = value;

                this.props.onChange({ data });
            };
        };

        const cards = [];
        for (const category of Object.keys(this.props.schema.properties)) {
            const fields = [];

            for (const field of Object.keys(this.props.schema.properties[category].properties)) {
                fields.push(
                    <Field
                        label={`labels.fields.${field}`}
                        initialValues={{ value: (
                                this.props.record[category] ?
                                    this.props.record[category][field] :
                                    undefined
                            )
                        }}
                        schema={this.props.schema.properties[category].properties[field]}
                        key={`${category}:${field}`}
                        formKey={`${category}:${field}`}
                        onChange={generateChangeHandler(category, field)}
                        editable={this.props.editable}
                        translation={this.props.translation}
                    />
                );
            }

            cards.push(
                <Card
                    style={{ margin: '24px 0', fontSize: '0.9em', lineHeight: '1.4em' }}
                    key={`titles.fields.${category}`}
                >
                    <CardHeader
                        title={this.props.translation.t(`titles.fields.${category}`)}
                    />
                    <Divider inset />
                    <List>
                        {fields}
                    </List>
                </Card>
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
