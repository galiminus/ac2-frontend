import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './pages.css';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import PageBanner from './page-banner';

const Pages = React.createClass({
    propTypes: {
        model: PropTypes.string.isRequired,
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
                            <div styleName="page" key={page.id}>
                                <PageBanner
                                    page={page}
                                    translation={this.props.translation}
                                    compact
                                />
                            </div>
                        );
                    })
                }
                <FloatingActionButton
                    href={`/pages/new?model=${this.props.model}`}
                >
                    <CreateContentIcon />
                </FloatingActionButton>
            </div>
        );
    }
});

export default CSSModules(Pages, styles);
