import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { FlatButton, Dialog } from 'material-ui';

const DisconnectedModal = React.createClass({
    propTypes: {
        isDisconnected: PropTypes.bool.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Dialog
                actions={[
                    <FlatButton
                        key={'goToLoginPage'}
                        label={this.props.translation.t('actions.goToLoginPage')}
                        primary
                        linkButton
                        href="/welcome/login"
                    />
                ]}
                open={this.props.isDisconnected}
            >
                {this.props.translation.t('errors.disconnected')}
            </Dialog>
        );
    }
});

export default DisconnectedModal;
