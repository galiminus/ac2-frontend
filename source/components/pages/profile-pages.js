import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PagesContainer from './pages-container';
import Profiles from 'components/profile/profiles';

const ProfilesFactory = React.createFactory(Profiles);

const ProfilePages = React.createClass({
    propTypes: {
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.members'));
    },

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Profile' }} factory={ProfilesFactory} {...this.props} />
        );
    }
});

export default connect(undefined, { setTitle })(ProfilePages);
