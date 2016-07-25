import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { CardTitle } from 'material-ui/Card';

import { Link } from 'react-router';

import PageAvatar from 'components/pages/page-avatar';

const PageCardTitle = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        titleColor: PropTypes.string.isRequired,
        children: PropTypes.node,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <CardTitle
                style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}
                title={
                    <Link to={`/profiles/${this.props.page.id}`} style={{ textDecoration: 'none', color: this.props.titleColor }}>
                        <PageAvatar page={this.props.page} />
                        {this.props.page.title}
                    </Link>
                }
            >
                <div>
                    {this.props.children}
                </div>
            </CardTitle>
        );
    }
});

export default PageCardTitle;
