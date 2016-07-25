import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import MessagesContainer from 'components/messages/messages-container';

const QuizzPage = React.createClass({
    propTypes: {
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.quizz'));
    },

    render() {
        return (
            <MessagesContainer
                {...this.props}
                filters={{
                    type: 'Message::Quizz'
                }}
                include={[
                    'received_likes',
                    'sender',
                    'recipient',
                    'comments',
                    'comments.received_likes',
                    'comments.received_likes.page'
                ]}
            />
        );
    }
});

export default connect(undefined, { setTitle })(QuizzPage);
