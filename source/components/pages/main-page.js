import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import MessagesTabs from 'components/messages/messages-tabs';

const MainPage = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <MessagesTabs
                {...this.props}
                sort={[
                    '-updated_at'
                ]}
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

export default MainPage;
