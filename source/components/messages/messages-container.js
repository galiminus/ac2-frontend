import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import api from 'api';

import ResourcesContainer from 'components/resources-container';
import Messages from 'components/messages/messages';

const MessagesFactory = React.createFactory(Messages);

function mapStateToProps(state, props) {
    if (props.page.type === 'Page::Main') {
        return ({ messages: state.messages });
    }

    return ({ messages: state.messagesByPage.get(props.page.id) });
}

const MessagesContainer = React.createClass({
    propTypes: {
        messages: PropTypes.object,
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourcesContainer
                {...this.props}
                factory={MessagesFactory}
                model={this.props.params.model}
                find={api.messages.find}
                resources={this.props.messages}
            />
        );
    }
});

export default connect(mapStateToProps)(MessagesContainer);
