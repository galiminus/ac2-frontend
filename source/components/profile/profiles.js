import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './profiles.css';

import ProfileBanner from 'components/profile/profile-banner';

const Profiles = React.createClass({
    propTypes: {
        pages: PropTypes.object,
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
                            <div styleName="page" key={page.id}>
                                <ProfileBanner
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

export default CSSModules(Profiles, styles);
