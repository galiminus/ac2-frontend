import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/List';
import { Card, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import api from 'api';
import actionCreators from 'action-creators';
import Field from 'components/field';

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId)
    };
}

const Profile = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired
    },

    render() {
        const generateChangeHandler = (category, field) => {
            return (value) => {
                const data = Object.assign({}, this.props.page.data);
                if (!data[category]) {
                    data[category] = {};
                }
                data[category][field] = value;

                api.pages.update(this.props.page.id, { data }).then(this.props.addResource);
            };
        };

        const cards = [];
        for (const category of Object.keys(this.props.page.schema.properties)) {
            const fields = [];

            for (const field of Object.keys(this.props.page.schema.properties[category].properties)) {
                fields.push(
                    <Field
                        label={`labels.userPageFields.${field}`}
                        initialValues={{ value: (
                                this.props.page.data[category] ?
                                    this.props.page.data[category][field] :
                                    undefined
                            )
                        }}
                        type={this.props.page.schema.properties[category].properties[field].type}
                        key={`${category}:${field}`}
                        formKey={`${category}:${field}`}
                        onChange={generateChangeHandler(category, field)}
                        editable={this.props.page.permissions.update}
                        translation={this.props.translation}
                    />
                );
            }

            cards.push(
                <Card
                    style={{ margin: '24px 0', fontSize: '0.9em', lineHeight: '1.4em' }}
                    key={`titles.userPageFields.${category}`}
                >
                    <CardHeader
                        title={this.props.translation.t(`titles.userPageFields.${category}`)}
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

export default connect(mapStateToProps, actionCreators)(Profile);
