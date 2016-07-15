import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { CardTitle } from 'material-ui/Card';

import { Link } from 'react-router';

import PageAvatar from 'components/pages/page-avatar';

const PageCardTitle = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        children: PropTypes.node,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <CardTitle
                titleColor="#fff"
                style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}
                title={
                    <Link to={`/${this.props.page.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                        <PageAvatar
                            page={this.props.page}
                        />
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
