import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import Message from 'components/messages/message';
import ResourceContainer from 'components/resource-container';

import api from 'api';

const MessageFactory = React.createFactory(Message);

function mapStateToProps(state, props) {
    return ({
        message: state.messages.get(props.params.resourceId)
    });
}

const MessagePage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        message: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceContainer
                promises={[
                    api.messages.get(this.props.params.resourceId)
                ]}
                factory={MessageFactory}
                resource={this.props.message}
            />
        );
    }
});

export default connect(mapStateToProps)(MessagePage);
