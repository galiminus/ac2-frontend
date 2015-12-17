import React from "react"
import { connect } from "react-redux"
import Cable from 'es6-actioncable'

function mapStateToProps(state, props) {
    return {
        tokens: state.tokens || {}
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
            connected: () => {
                console.log("Connected to " + channel)
            },

            received: (data) => {
                console.log(data)
            }
        })
    },

    componentDidMount() {
        let subscriptions = []
        for (let accessToken in this.props.tokens.toJS()) {
            subscriptions.push(this.subscribe(this.setupConsumer(accessToken), this.props.channel))
        }
        this.setState({subscriptions})
    },

    componentWillUnmount() {
        for (let subscription of this.state.subscriptions) {
            subscription.unsubscribe()
        }

        for (let accessToken in consumers) {
            let consumer = consumers[accessToken]

            if (consumer.subscriptions.subscriptions.length == 1) {
                Cable.endConsumer(consumer)
            }
        }
    },

    render() {
        return null;
    }
})

export default connect(mapStateToProps)(ActionCable)
