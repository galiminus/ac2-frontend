import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Link } from 'react-router';

import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PageCardTitle from 'components/pages/page-card-title';

import RelationChip from './relation-chip';

const ProfileBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            compact: false
        });
    },

    render() {
        return (
            <Card style={Object.assign({ marginTop: 32 }, this.props.style)}>
                <CardMedia
                    overlay={
                        <PageCardTitle page={this.props.page}>
                            {!this.props.compact &&
                                <RelationChip
                                    page={this.props.page}
                                    translation={this.props.translation}
                                />
                            }
                        </PageCardTitle>
                    }
                >
                    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150" />
                </CardMedia>
                <CardActions style={{ textAlign: 'right' }}>
                    <Link to={`/${this.props.page.id}/profile`}>
                        <FlatButton label={this.props.translation.t('labels.about')} />
                    </Link>
                </CardActions>
            </Card>
        );
    }
});

export default ProfileBanner;
