import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import MainLayout from 'components/main-layout';
import MessagesContainer from 'components/messages/messages-container';

const MainPage = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        const baseProps = {
            ...this.props,
            sort: ['updated_at'],
            include: [
                'received_likes',
                'sender',
                'recipient',
                'comments',
                'comments.received_likes',
                'comments.received_likes.page'
            ]
        };

        return (
            <MainLayout
                {...this.props}
                baseUrl=""
                leftNav={
                    [
                    ]
                }
                tabs={{
                    posts: (
                        <MessagesContainer
                            {...baseProps}
                            formType="Message::Post"
                        />
                    ),
                    quizz: (
                        <MessagesContainer
                            {...baseProps}
                            filters={{ type: 'Message::Quizz' }}
                            formType="Message::Quizz"
                        />
                    ),
                    polls: (
                        <MessagesContainer
                            {...baseProps}
                            filters={{ type: 'Message::Poll' }}
                            formType="Message::Poll"
                        />
                    )
                }}
            />
        );
    }
});

export default MainPage;
