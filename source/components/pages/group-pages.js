import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PagesContainer from './pages-container';
import Groups from 'components/group/groups';

const GroupsFactory = React.createFactory(Groups);

const GroupPages = React.createClass({
    propTypes: {
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.groups'));
    },

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Group' }} factory={GroupsFactory} {...this.props} />
        );
    }
});

export default connect(undefined, { setTitle })(GroupPages);
