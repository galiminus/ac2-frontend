import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { CardTitle } from 'material-ui/Card';

import { Link } from 'react-router';

import PageAvatar from 'components/pages/page-avatar';

const PageCardTitle = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Link to={`/${this.props.page.id}`} style={{ textDecoration: "none" }}>
                <CardTitle
                    titleColor="#fff"
                    style={{ padding: 8 }}
                    title={
                        <div>
                            <PageAvatar
                                page={this.props.page}
                            />
                            {this.props.page.title}
                        </div>
                    }
                    {...this.props}
                />
            </Link>
        );
    }
});

export default PageCardTitle;
