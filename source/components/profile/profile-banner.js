import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './profile-banner.css';

import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PageCardTitle from 'components/pages/page-card-title';

import RelationChip from './relation-chip';

const ProfileBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Card styleName="card">
                <CardMedia
                    overlay={
                        <PageCardTitle page={this.props.page}>
                            <RelationChip
                                page={this.props.page}
                                translation={this.props.translation}
                            />
                        </PageCardTitle>
                    }
                >
                    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150" />
                </CardMedia>
                <CardActions styleName="card-actions">
                    <Link to={`/profiles/${this.props.page.slug}`}>
                        <FlatButton label={this.props.translation.t('labels.about')} />
                    </Link>
                </CardActions>
            </Card>
        );
    }
});

export default CSSModules(ProfileBanner, styles);
