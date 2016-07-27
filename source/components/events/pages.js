import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PagesContainer from 'components/pages/pages-container';
import Events from 'components/events/events';

const EventsFactory = React.createFactory(Events);

const EventPages = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.events'));
    },

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Event' }} factory={EventsFactory} {...this.props} />
        );
    }
});

export default connect(undefined, { setTitle })(EventPages);
