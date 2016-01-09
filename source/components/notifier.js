import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Snackbar } from "material-ui";

function mapStateToProps(state) {
    return {
        notification: state.notifications
    };
}

const Notifier = React.createClass({
    propTypes: {
        notification: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return ({
            notification: { message: null }
        });
    },

    handleRequestClose() {},

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif"
        };

        const message = this.props.notification.message ? this.context.translation.t(`errors.${this.props.notification.message}`) : "";
        return (
            <Snackbar message={message} style={style} open={message !== ""} onRequestClose={this.handleRequestClose} />
        );
    }
});

export default connect(mapStateToProps)(Notifier);
