import React from "react"
import { connect } from 'react-redux'
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

function mapStateToProps(state, props) {
    let page;
    if (props.user) {
        page = state.pages.get(props.user.page_id)
    }

    if (!page) {
        page = { data: { full_name: "" } }
    }

    return ({ page })
}

const CurrentUserMenu = React.createClass({
    goToPage(e) {
        dispatch(updatePath(`/${this.props.user.page_id}`))
        e.preventDefault()
    },

    goToProfile(e) {
        dispatch(updatePath(`/${this.props.user.page_id}/profile`))
        e.preventDefault()
    },

    goToAccount(e) {
        dispatch(updatePath('/account'))
        e.preventDefault()
    },

    disconnect() {
        dispatch(tokens.clear())
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
            <IconMenu iconButtonElement={<Avatar style={style}>{this.props.page.data.full_name[0]}</Avatar>}>
                <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserPage" />} href={`/${this.props.user.page_id}`} onClick={this.goToPage} />
                <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserProfile" />} href={`/${this.props.user.page_id}/profile`} onClick={this.goToProfile} />
                <MenuItem index={2} primaryText={<FormattedMessage id="links.accountSettings" />} href="/account" onClick={this.goToAccount} />
                <MenuItem index={4} primaryText={<FormattedMessage id="actions.disconnect" />} onClick={this.disconnect} />
            </IconMenu>
        )
    }
})

export default connect(mapStateToProps)(CurrentUserMenu)
