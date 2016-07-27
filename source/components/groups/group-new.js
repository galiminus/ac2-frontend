import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageForm from 'components/pages/page-form';

const GroupNew = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (<PageForm model="Page::Group" />);
    }
});

export default GroupNew;
