import React from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"

import {
    Tabs,
    Tab,
    List,
} from "material-ui"

import { pages } from "api"
import { userPageFields } from "config"
import FieldCreator from "components/field-creator"

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId) || { data : {} }
    }
}

const Profile = React.createClass({
    render() {
        const style = {
            fontFamily: "Roboto, sans-serif",
            zIndex: 2,
            background: "white",
            height: "100%",
        }

        let tabs = []
        for (let category in userPageFields) {
            let fields = []

            for (let field in userPageFields[category]) {
                let fieldForm = FieldCreator(field, this.props.page.data[field], userPageFields[category][field])

                const updateValue = (value) => {
                    let data = Object.assign({}, this.props.page.data)
                    data[field] = value

                    pages.update(this.props.page.id, { data })
                }

                fields.push(
                    React.createElement(fieldForm, { key: field, onChange: updateValue })
                )
            }

            tabs.push(
                <Tab key={`titles.userPageFields.${category}`} label={<FormattedMessage id={`titles.userPageFields.${category}`} />}>
                    <List>
                        {fields}
                    </List>
                </Tab>
            )
        }
        return (
            <div style={style}>
                <Tabs className="col-xs-12 col-sm-12 col-md-8" style={{padding: 0}}>{tabs}</Tabs>
            </div>
        )
    }
})

export default connect(mapStateToProps)(Profile)
