import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { Snackbar } from 'material-ui';

import actionCreators from 'action-creators';

function mapStateToProps(state) {
    return {
        notification: state.notifications
    };
}

const Notifier = React.createClass({
    propTypes: {
        notification: PropTypes.object.isRequired,
        clearNotifications: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            notification: { message: null }
        });
    },

    handleRequestClose() {
        this.props.clearNotifications();
    },

    render() {
        const style = {
            fontFamily: 'Roboto, sans-serif'
        };

        const message = this.props.notification.message ? this.context.translation.t(`errors.${this.props.notification.message}`) : '';
        return (
            <Snackbar
                message={message}
                style={style}
                open={message !== ''}
                onRequestClose={this.handleRequestClose}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Notifier);
