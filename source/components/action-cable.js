import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Cable from "es6-actioncable";

function mapStateToProps(state) {
    return {
        tokens: state.tokens
    };
}

const consumers = {};

const ActionCable = React.createClass({
    propTypes: {
        tokens: PropTypes.object.isRequired,
        channel: PropTypes.string.isRequired,
        onMessage: PropTypes.func.isRequired,
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
            received: this.props.onMessage
        });
    },

    render() {
        return <div>{this.props.children}</div>;
    }
});

export default connect(mapStateToProps)(ActionCable);
