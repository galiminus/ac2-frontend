import React from "react"
import Link from "react-router"

import {
    Avatar,
    IconMenu
} from "material-ui"

import MenuItem from "material-ui/lib/menus/menu-item"

import { dispatch } from "store"
import { updatePath } from 'redux-simple-router'

import { FormattedMessage } from 'react-intl'

import { tokens } from "action-creators"

export default React.createClass({
    goToPage(e) {
        dispatch(updatePath(`/${this.props.user.page_id}`))
        e.preventDefault()
    },

    goToProfile(e) {
        dispatch(updatePath(`/${this.props.user.page_id}/profile`))
        e.preventDefault()
    },

    disconnect() {
        dispatch(tokens.removeAll())
        dispatch(updatePath("/welcome/login"))
    },

    render() {
        const style = {
            marginTop: 8,
            marginLeft: 24,
            fontFamily: "Roboto, sans-serif",
            textTransform: "uppercase",
            cursor: "pointer"
        }

        return (
            <IconMenu iconButtonElement={<Avatar style={style}>{this.props.user.profile.name[0]}</Avatar>}>
                <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserPage" />} href={`/${this.props.user.page_id}`} onClick={this.goToPage} />
                <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserProfile" />} href={`/${this.props.user.page_id}/profile`} onClick={this.goToProfile} />
                <MenuItem index={2} primaryText={<FormattedMessage id="links.accountSettings" />} />
                <MenuItem index={4} primaryText={<FormattedMessage id="actions.disconnect" />} onClick={this.disconnect} />
            </IconMenu>
        )
    }
})
