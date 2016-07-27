import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PageForm from 'components/pages/page-form';

const ProfileNew = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.newProfile'));
    },

    render() {
        return (<PageForm model="Page::Profile" />);
    }
});

export default connect(undefined, { setTitle })(ProfileNew);
