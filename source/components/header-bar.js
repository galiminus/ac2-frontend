import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './header-bar.css';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import ToolbarLogo from 'components/toolbar-logo';
import CurrentPageTitle from 'components/current-page-title';
import CurrentUserMenu from 'components/current-user-menu';

import { toggleLeftNav } from 'action-creators';

const HeaderBar = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    render() {
        return (
            <Toolbar styleName="root">
                <ToolbarGroup key={0} float="left" styleName="left">
                    <div styleName="leftNavTrigger">
                        <MenuIcon
                            styleName="leftNavTrigger"
                            style={{ height: 56 }}
                            color="#ffffff"
                            hoverColor="#ffffff"
                            onClick={this.props.toggleLeftNav}
                        />
                    </div>
                    <ToolbarLogo styleName="logo" />
                    <ToolbarSeparator styleName="separator" />

                    <CurrentPageTitle />

                    <AutoComplete
                        hintText={this.context.translation.t('labels.search')}
                        dataSource={[]}
                        fullWidth
                        styleName="searchField"
                        style={{ width: '40%', margin: '5px 0px 5px 16px', background: '#444', padding: '0 12px' }}
                        hintStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        underlineStyle={{ width: '100%' }}
                        inputStyle={{ color: '#fff' }}
                    />

                </ToolbarGroup>
                <ToolbarGroup key={2} float="right" styleName="right">
                    <CurrentUserMenu />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

export default connect(undefined, { toggleLeftNav })(CSSModules(HeaderBar, styles));
