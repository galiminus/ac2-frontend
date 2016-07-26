import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Link from 'components/link';

const AdditionalLinks = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ul
                style={{
                    listStyle: 'none',
                    paddingLeft: 16,
                    paddingBottom: 16
                }}
            >
                {
                    this.props.resources.valueSeq().map((page, index) => {
                        return (
                            <li
                                key={index}
                                style={{
                                    display: 'inline-block',
                                    padding: 4
                                }}
                            >
                                <Link
                                    style={{
                                        color: this.context.muiTheme.palette.accent3Color
                                    }}
                                    to={`/statics/${page.slug}`}
                                >
                                    {page.title}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});

export default AdditionalLinks;
