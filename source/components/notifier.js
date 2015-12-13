import React from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"

import { Snackbar } from "material-ui"

function mapStateToProps(state, props) {
    return {
        notification: state.notifications || { message: null }
    }
}

const Notifier = React.createClass({
    componentWillReceiveProps(newProps) {
        if (newProps.notification.message)
            this.refs.notice.show()
    },

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif"
        }

        let message;

        if (this.props.notification.message) {
            message = <FormattedMessage id={`errors.${this.props.notification.message}`} />
        }
        else {
            message = ""
        }
        return (
            <Snackbar message={message} ref="notice" style={style} />
        )
    }
})

export default connect(mapStateToProps)(Notifier)
