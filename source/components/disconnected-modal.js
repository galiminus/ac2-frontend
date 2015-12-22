import React, { PropTypes } from "react";
import { FlatButton, Dialog } from "material-ui";
import { FormattedMessage } from "react-intl";

const DisconnectedModal = React.createClass({
    propTypes: {
        isDisconnected: PropTypes.bool.isRequired
    },

    render() {
        return (
            <Dialog
                actions={[
                    <FlatButton
                        key={"goToLoginPage"}
                        label={<FormattedMessage id="actions.goToLoginPage" />}
                        primary
                        linkButton
                        href="/welcome/login"
                    />
                ]}
                open={this.props.isDisconnected}
            >
                <FormattedMessage id="errors.disconnected" />
            </Dialog>
        );
    }
});

export default DisconnectedModal;
