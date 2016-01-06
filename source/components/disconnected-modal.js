import React, { PropTypes } from "react";
import { FlatButton, Dialog } from "material-ui";

const DisconnectedModal = React.createClass({
    propTypes: {
        isDisconnected: PropTypes.bool.isRequired,
        translations: PropTypes.object.isRequired
    },

    render() {
        return (
            <Dialog
                actions={[
                    <FlatButton
                        key={"goToLoginPage"}
                        label={this.props.translations.t("actions.goToLoginPage")}
                        primary
                        linkButton
                        href="/welcome/login"
                    />
                ]}
                open={this.props.isDisconnected}
            >
                {this.props.translations.t("errors.disconnected")}
            </Dialog>
        );
    }
});

export default DisconnectedModal;
