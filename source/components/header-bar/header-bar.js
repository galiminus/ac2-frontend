import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './header-bar.css';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import ToolbarLogo from 'components/toolbar-logo';
import CurrentPageTitle from 'components/current-page-title';
import CurrentUserMenu from 'components/current-user-menu';

import SettingsMenu from './settings-menu';

import actionCreators from 'action-creators';

function mapStateToProps(state) {
    return {
        canUpdateSettings: state.settings.permissions.update
    };
}

const HeaderBar = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        canUpdateSettings: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Toolbar styleName="root">
                <ToolbarGroup key={0} styleName="left">
                    <div styleName="leftNavTrigger">
                        <MenuIcon
                            styleName="leftNavTrigger"
                            style={{ height: 56 }}
                            color="#ffffff"
                            hoverColor="#ffffff"
                            onClick={this.props.toggleLeftNav}
                        />
                    </div>
                    <div styleName="logo">
                        <ToolbarLogo />
                    </div>
                    <ToolbarSeparator styleName="separator" />

                    <div styleName="title">
                        <CurrentPageTitle />
                    </div>

                    <div styleName="searchField">
                        <AutoComplete
                            hintText={this.context.translation.t('labels.search')}
                            dataSource={[]}
                            fullWidth
                            hintStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                            underlineStyle={{ width: '100%' }}
                            inputStyle={{ color: '#fff' }}
                        />
                    </div>
                </ToolbarGroup>
                <ToolbarGroup key={2} styleName="right">
                    {this.props.canUpdateSettings &&
                        <SettingsMenu />
                    }
                    <CurrentUserMenu />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(CSSModules(HeaderBar, styles));
