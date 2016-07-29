import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PagesContainer from 'components/pages/pages-container';
import Profiles from 'components/profiles/profiles';

const ProfilesFactory = React.createFactory(Profiles);

const ProfilePages = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.profiles'));
    },

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Profile' }} factory={ProfilesFactory} {...this.props} />
        );
    }
});

export default connect(undefined, { setTitle })(ProfilePages);
