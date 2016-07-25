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
        resources: PropTypes.object,
        translation: PropTypes.object.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderProfiles() {
        return (
            this.props.resources.valueSeq().map((page) => {
                return (
                    <Card styleName="card" key={page.id}>
                        <PageCardTitle page={page} titleColor="#333" />
                        <CardActions styleName="card-actions">
                            <Link to={`/messages/${page.slug}`}>
                                <FlatButton label={this.props.translation.t('labels.page')} />
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
                translation={this.props.translation}
                styles={styles}
            >
                {this.renderProfiles()}
            </Loader>
        );
    }
});

export default CSSModules(Profiles, styles);
