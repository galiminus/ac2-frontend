import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { typeToShortPluralType } from 'utils/types';

import { connect } from 'react-redux';

import Form from 'components/form';

import FlatButton from 'material-ui/FlatButton';

import actionCreators from 'action-creators';
import api from 'api';

function mapStateToProps(state, props) {
    return ({
        schema: state.schemaByModel.get(props.type)
    });
}

const MessageCreateForm = React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired,
        addResource: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired,
        schema: PropTypes.object.isRequired,
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({
            record: {},
            loading: false,
            isValid: false
        });
    },

    handleChange(record, errors) {
        this.setState({
            record,
            isValid: Object.keys(errors).length === 0
        });
    },

    handleSubmit() {
        this.setState({ loading: true, record: {} });
        return (
            api.messages.create(this.props.type, { data: this.state.record })
                .then(
                    (resource) => {
                        this.props.addResource(resource);
                        this.props.pushNotification('saveSuccess');
                        this.props.onSubmit(resource);
                    },
                    () => {
                        this.props.pushNotification('saveError');
                    }
                )
                .then(() => {
                    this.setState({ loading: false });
                })
        );
    },

    render() {
        return (
            <div>
                <Form
                    style={{ padding: '0 16px' }}
                    editable
                    label={typeToShortPluralType(this.props.type)}
                    loading={this.state.loading}
                    schema={this.props.schema.data}
                    onChange={this.handleChange}
                    record={this.state.record}
                />
                <div style={{ textAlign: 'right', padding: '0 16px 8px 0' }}>
                    <FlatButton
                        disabled={!this.state.isValid}
                        type="submit"
                        label={this.context.translation.t('actions.post')}
                        secondary
                        onTouchTap={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(MessageCreateForm);
