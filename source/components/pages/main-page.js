import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

const MainPage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.mainFeed'));
    },

    render() {
        return (
            React.cloneElement(this.props.children, { ...this.props, key: undefined })
        );
    }
});

export default connect(undefined, { setTitle })(MainPage);
