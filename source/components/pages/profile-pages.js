import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PagesContainer from './pages-container';

const ProfilePages = React.createClass({
    propTypes: {
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.members'));
    },

    render() {
        return (
            <PagesContainer model="Page::Profile" {...this.props} />
        );
    }
});

export default connect(undefined, { setTitle })(ProfilePages);
