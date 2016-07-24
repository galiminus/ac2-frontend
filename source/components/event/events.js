import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './events.css';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import EventBanner from 'components/event/event-banner';

const ProfilePagesPage = React.createClass({
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
                                <EventBanner
                                    page={page}
                                    translation={this.props.translation}
                                    compact
                                />
                            </div>
                        );
                    })
                }
                <FloatingActionButton
                    href={`/pages/new?model=Page::Event`}
                >
                    <CreateContentIcon />
                </FloatingActionButton>
            </div>
        );
    }
});

export default CSSModules(ProfilePagesPage, styles);
