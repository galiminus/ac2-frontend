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
        notification: PropTypes.object.isRequired,
        translations: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return ({
            notification: { message: null }
        });
    },

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif"
        };

        const message = this.props.notification.message ? this.props.translations.t(`errors.${this.props.notification.message}`) : "";
        return (
            <Snackbar message={message} ref="notice" style={style} open={message !== ""} />
        );
    }
});

export default connect(mapStateToProps)(Notifier);
