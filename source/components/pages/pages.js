import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PageBanner from './page-banner';

const Pages = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
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
                            <div style={{ width: '48%' }} key={page.id}>
                                <PageBanner
                                    page={page}
                                    translation={this.props.translation}
                                    compact
                                />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
});

export default Pages;
