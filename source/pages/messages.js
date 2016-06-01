import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import actionCreators from 'action-creators';

function mapStateToProps(state, props) {
    return {
    };
}

const Messages = React.createClass({
    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    getChannels() {
        return (['MessagesChannel']);
    },

    handleMessage() {

    },

    render() {
        return (
            <div className='row' style={{ minHeight: '100%' }}>
                <section className='col-md col-xs-12' style={{ paddingLeft: 0, paddingRight: 0, marginTop: 56 }}>
                    {this.props.children}
                </section>
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Messages);
