import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Cable from 'es6-actioncable';

import settings from 'webpack-env-loader!settings';

function mapStateToProps(state) {
    return {
        tokens: state.tokens
    };
}

const consumers = {};

function connectToCable(Component) {
    const ActionCable = React.createClass({
        propTypes: {
            tokens: PropTypes.object.isRequired,
            children: React.PropTypes.node
        },

        getInitialState() {
            return { subscriptions: [] };
        },

        componentDidMount() {
            const tokens = this.props.tokens.toJS();
            this.subscriptions = [];

            const channels = this.refs.child.getChannels();
            for (const channel of channels) {
                for (const accessToken in tokens) {
                    if (tokens.hasOwnProperty(accessToken)) {
                        this.subscriptions.push(this.subscribe(this.setupConsumer(accessToken), channel));
                    }
                }
            }
        },

        componentWillReceiveProps(props) {
            for (const accessToken in consumers) {
                if (!props.tokens.get(accessToken)) {
                    Cable.endConsumer(consumers[accessToken]);
                    delete consumers[accessToken];
                }
            }
        },

        componentWillUnmount() {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        },

        setupConsumer(accessToken) {
            if (!consumers[accessToken]) {
                consumers[accessToken] = Cable.createConsumer(`${settings.cableEndpoint}/?token=${accessToken}`);
            }

            return (consumers[accessToken]);
        },

        subscribe(consumer, channel) {
            return consumer.subscriptions.create(channel, {
                received: this.refs.child.handleMessage
            });
        },

        render() {
            return (<Component ref="child" {...this.props} />);
        }
    });

    return (connect(mapStateToProps)(ActionCable));
}

export default connectToCable;
