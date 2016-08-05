import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import { typeToShortPluralType } from 'utils/types';

import { connect } from 'react-redux';

import Form from 'components/form';
import FlatButton from 'material-ui/FlatButton';

import actionCreators from 'action-creators';

const style = {
    root: {},
    submitButton: {}
};

const phoneScreenStyle = {
    ...style,
    root: {
        ...style.root,
        margin: '0 12px'
    },
    submitButton: {
        ...style.submitButton,
        width: '100%'
    }
};

function mapStateToProps(state, props) {
    return ({
        schema: state.schemaByModel.get(props.type)
    });
}

const PageCreateForm = React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        onRequest: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired,
        schema: PropTypes.object.isRequired,
        record: PropTypes.object.isRequired,
        only: PropTypes.array
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getDefaultProps() {
        return ({
            record: {}
        });
    },

    getInitialState() {
        return ({
            style: {},
            record: this.props.record,
            loading: false,
            isValid: false
        });
    },

    componentDidMount() {
        this.media({ minWidth: 800 }, () => this.setState({ style }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    handleChange(record, errors) {
        this.setState({
            record,
            isValid: Object.keys(errors).length === 0
        });
    },

    handleSubmit() {
        this.setState({ loading: true });
        return (
            this.props.onRequest(this.state.record)
                .then(
                    (resource) => {
                        this.props.addResource(resource);
                        this.props.pushNotification('saveSuccess');
                        this.props.onSubmit(resource);
                    },
                    () => {
                        this.props.pushNotification('saveError');
                    }
                ).then(() => {
                    this.setState({ loading: false });
                })
        );
    },

    render() {
        return (
            <div style={this.state.style.root}>
                <Form
                    editable
                    label={typeToShortPluralType(this.props.type)}
                    loading={this.state.loading}
                    schema={this.props.schema.data}
                    onChange={this.handleChange}
                    record={this.state.record}
                    only={this.props.only}
                />
                <div style={{ textAlign: 'right', marginBottom: 16 }}>
                    <FlatButton
                        style={{
                            ...this.state.style.submitButton,
                            color: this.state.isValid ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                            backgroundColor: this.state.isValid ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        disabled={!this.state.isValid}
                        onTouchTap={this.handleSubmit}
                        label={this.context.translation.t('actions.save')}
                    />
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PageCreateForm);
