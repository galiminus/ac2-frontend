import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PageBanner from './page-banner';

const Pages = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
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
                            <PageBanner page={page} style={{ width: '48%' }} />
                        );
                    })
                }
            </div>
        );
    }
});

export default Pages;
