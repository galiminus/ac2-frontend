import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { FlatButton, Dialog } from 'material-ui';

const DisconnectedModal = React.createClass({
    propTypes: {
        isDisconnected: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Dialog
                actions={[
                    <FlatButton
                        key={'goToLoginPage'}
                        label={this.context.translation.t('actions.goToLoginPage')}
                        primary
                        linkButton
                        href="/welcome/login"
                    />
                ]}
                open={this.props.isDisconnected}
            >
                {this.context.translation.t('errors.disconnected')}
            </Dialog>
        );
    }
});

export default DisconnectedModal;
