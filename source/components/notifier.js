import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

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

    getDefaultProps() {
        return ({
            notification: { message: null }
        })
    },

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif"
        };

        let message;

        if (this.props.notification.message) {
            message = <FormattedMessage id={`errors.${this.props.notification.message}`} />;
        } else {
            message = "";
        }

        return (
            <Snackbar message={message} ref="notice" style={style} open={message !== ""} />
        );
    }
});

export default connect(mapStateToProps)(Notifier);
