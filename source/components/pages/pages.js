import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PageBanner from './page-banner';

const Pages = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent:
                    'space-between'
                }}
            >
                {
                    this.props.pages.valueSeq().map((page) => {
                        return (
                            <PageBanner key={page.id} page={page} style={{ width: '48%' }} translation={this.props.translation} />
                        );
                    })
                }
            </div>
        );
    }
});

export default Pages;
