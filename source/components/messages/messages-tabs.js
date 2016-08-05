import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import browserHistory from 'react-router/lib/browserHistory';

import { Tabs, Tab } from 'material-ui/Tabs';

import MessagesContainer from 'components/messages/messages-container';

const MessagesTabs = React.createClass({
    propTypes: {
        filters: PropTypes.object,
        baseUrl: PropTypes.string,
        location: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    handleActive(path) {
        browserHistory.push((this.props.baseUrl || '') + path);
    },

    activeIndex() {
        if (this.props.location.pathname.match(/\/quizz$/)) {
            return (1);
        }

        if (this.props.location.pathname.match(/\/polls$/)) {
            return (2);
        }

        return (0);
    },

    render() {
        return (
            <Tabs
                tabItemContainerStyle={{
                    backgroundColor: 'transparent'
                }}
                contentContainerStyle={{
                    marginTop: 12
                }}
                inkBarStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }}
                initialSelectedIndex={this.activeIndex()}
            >
                <Tab
                    label={this.context.translation.t('links.allPosts')}
                    onActive={() => this.handleActive('/')}
                >
                    <MessagesContainer
                        {...this.props}
                        formType="Message::Post"
                    />
                </Tab>
                <Tab
                    label={this.context.translation.t('links.quizz')}
                    onActive={() => this.handleActive('/quizz')}
                >
                    <MessagesContainer
                        {...{ ...this.props, filters: { ...this.props.filters, type: 'Message::Quizz' } } }
                        formType="Message::Quizz"
                    />
                </Tab>
                <Tab
                    label={this.context.translation.t('links.polls')}
                    onActive={() => this.handleActive('/polls')}
                >
                    <MessagesContainer
                        {...{ ...this.props, filters: { ...this.props.filters, type: 'Message::Poll' } } }
                        formType="Message::Poll"
                    />
                </Tab>
            </Tabs>
        );
    }
});

export default MessagesTabs;
