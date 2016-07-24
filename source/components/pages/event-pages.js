import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PagesContainer from './pages-container';
import Events from 'components/event/events';

const EventsFactory = React.createFactory(Events);

const EventPages = React.createClass({
    propTypes: {
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.events'));
    },

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Event' }} factory={EventsFactory} {...this.props} />
        );
    }
});

export default connect(undefined, { setTitle })(EventPages);
