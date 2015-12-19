import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage } from "react-intl"

import {
    ListItem,
    TextField
} from "material-ui"

const FieldCreator = (field, initialValue, type) => {
    const validate = values => {
        return {
            value: undefined
        }
    }

    let form = React.createClass({
        propTypes: {
            fields: PropTypes.object.isRequired,
            handleSubmit: PropTypes.func.isRequired,
            error: PropTypes.string,
            onChange: PropTypes.func,
        },

        getInitialState() {
            return { edit: false, mouseInside: false }
        },

        switchToValueMode() {
            if (!this.state.mouseInside)
                this.setState({edit: false})
        },

        switchToEditMode() {
            if (!this.state.mouseInside)
                this.setState({edit: true, mouseInside: true})
        },

        setMouseInside() {
            this.setState({mouseInside: true})
        },

        setMouseOutside() {
            this.setState({mouseInside: false})
        },

        update() {
            this.props.onChange(this.props.fields.value.value)
            this.setState({edit: false, mouseInside: false})
        },

        renderEdit() {
            const {
                fields: { value },
                handleSubmit
            } = this.props

            let valueField =
                <ListItem
                    onMouseEnter={this.setMouseInside}
                    onMouseLeave={this.setMouseOutside}
                    primaryText={
                        <form onSubmit={handleSubmit(this.update)}>
                            <TextField
                                ref="valueField"
                                {...value}
                                onBlur={this.switchToValueMode}
                                fullWidth={true}
                                hintText={<FormattedMessage id={`labels.userPageFields.${field}`} />}
                            />
                        </form>
                    }
                />

            setTimeout(() => { this.refs.valueField.focus() }, 1)
            return (valueField)
        },

        renderValue() {
            let secondaryText;

            if (initialValue) {
                switch (type) {
                    case "string":
                    case "country":
                    secondaryText =
                        <p>
                            {initialValue}
                        </p>

                    default:
                }
            }
            else {
                secondaryText = <p><FormattedMessage id="texts.emptyField" /></p>
            }

            return (
                <ListItem
                    style={{maxHeight: 80, minHeight: 80}}
                    primaryText={<FormattedMessage id={`labels.userPageFields.${field}`} />}
                    secondaryText={secondaryText}
                    onTouchTap={this.switchToEditMode} />
            )
        },

        render() {
            return (this.state.edit ? this.renderEdit() : this.renderValue())
        }
    })


    return reduxForm({
        form: field,
        fields: ['value'],
        initialValues: {
            value: initialValue
        },
        validate
    })(form)

}

export default FieldCreator
