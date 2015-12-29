import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Cable from "es6-actioncable";

import { resources } from "action-creators";

function mapStateToProps(state) {
    return {
        tokens: state.tokens
    };
}

function mapDispatchToProps(dispatch) {
    return {
        push: (message) => {
            if (message && message.data) {
                dispatch(resources.add(message.data));
                if (message.included) {
                    for (const record of message.included) {
                        dispatch(resources.add(record));
                    }
                }
            }
        }
    };
}

const consumers = {};

const ActionCable = React.createClass({
    propTypes: {
        push: PropTypes.func.isRequired,
        tokens: PropTypes.object.isRequired,
        channel: PropTypes.string.isRequired,
        children: React.PropTypes.node
    },

    getInitialState() {
        return { subscriptions: [] };
    },

    componentWillMount() {
        const subscriptions = [];
        const tokens = this.props.tokens.toJS();

        for (const accessToken in tokens) {
            if (tokens.hasOwnProperty(accessToken)) {
                subscriptions.push(this.subscribe(this.setupConsumer(accessToken), this.props.channel));
            }
        }
        this.setState({ subscriptions });
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
        for (const subscription of this.state.subscriptions) {
            subscription.unsubscribe();
        }
    },

    setupConsumer(accessToken) {
        if (!consumers[accessToken]) {
            consumers[accessToken] = Cable.createConsumer(`ws://localhost:28080/?token=${accessToken}`);
        }

        return (consumers[accessToken]);
    },

    subscribe(consumer, channel) {
        return consumer.subscriptions.create(channel, {
            received: this.props.push
        });
    },

    render() {
        return <div>{this.props.children}</div>;
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionCable);
