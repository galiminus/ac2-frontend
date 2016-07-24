import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './profiles.css';

import { Link } from 'react-router';

import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PageCardTitle from 'components/pages/page-card-title';
import Loader from 'components/loader';

const Profiles = React.createClass({
    propTypes: {
        pages: PropTypes.object,
        translation: PropTypes.object.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderProfiles() {
        return (
            this.props.pages.valueSeq().map((page) => {
                return (
                    <Card styleName="card" key={page.id}>
                        <CardMedia
                            overlay={<PageCardTitle page={page} />}
                        >
                            <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150" />
                        </CardMedia>
                        <CardActions styleName="card-actions">
                            <Link to={`/${page.slug}/profile`}>
                                <FlatButton label={this.props.translation.t('labels.about')} />
                            </Link>
                        </CardActions>
                    </Card>
                );
            })
        );
    },

    render() {
        return (
            <Loader
                onLoadMore={this.props.onLoadMore}
                hasMore={this.props.hasMore}
                loadingMore={this.props.loadingMore}
                styles={styles}
            >
                {this.renderProfiles()}
            </Loader>
        );
    }
});

export default CSSModules(Profiles, styles);
