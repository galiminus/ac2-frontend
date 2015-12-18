import React from "react"
import { connect } from "react-redux"
import Cable from 'es6-actioncable'

import { dispatchRecord } from "json-api"

function mapStateToProps(state, props) {
    return {
        tokens: state.tokens
    }
}

function mapDispatchToProps(dispatch) {
    return {
        push: (message) => {
            if (message && message.data) {
                dispatchRecord(message.data)
                if (message.included) {
                    for (let record of message.included) {
                        dispatchRecord(record)
                    }
                }
            }
        }
    }
}

let consumers = {}

const ActionCable = React.createClass({
    getInitialState() {
        return { subscriptions: [] }
    },

    setupConsumer(accessToken) {
        if (!consumers[accessToken]) {
            consumers[accessToken] = Cable.createConsumer(`ws://localhost:28080/?token=${accessToken}`)
        }

        return (consumers[accessToken])
    },

    subscribe(consumer, channel) {
        return consumer.subscriptions.create(channel, {
            received: this.props.push
         })
    },

    componentDidMount() {
        let subscriptions = []
        for (let accessToken in this.props.tokens.toJS()) {
            subscriptions.push(this.subscribe(this.setupConsumer(accessToken), this.props.channel))
        }
        this.setState({subscriptions})
    },

    componentWillReceiveProps(props) {
        for (let accessToken in consumers) {
            if (!props.tokens.get(accessToken)) {
                Cable.endConsumer(consumers[accessToken])
                delete consumers[accessToken]
            }
        }
    },

    componentWillUnmount() {
        for (let subscription of this.state.subscriptions) {
            subscription.unsubscribe()
        }
    },

    render() {
        return this.props.children;
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionCable)
