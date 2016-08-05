import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import actionCreators from 'action-creators';

const ResourceContainer = React.createClass({
    propTypes: {
        addResource: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired,
        promises: PropTypes.array.isRequired,
        factory: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({
            loading: true
        });
    },

    componentWillMount() {
        Promise.all(this.props.promises)
            .then(
                (responses) => {
                    for (const response of responses) {
                        this.props.addResource(response);
                    }
                    this.setState({ loading: false });
                },
                () => {
                    this.props.pushNotification('resource_get_fatal_error');
                }
            );
    },

    render() {
        if (this.state.loading) {
            return (<div />);
        }

        return (
            this.props.factory(
                {
                    loading: this.state.loading,
                    ...this.props
                }
            )
        );
    }
});

export default connect(undefined, actionCreators)(ResourceContainer);
