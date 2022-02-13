import React, { useEffect } from 'react';
import { Button, Grid, IconButton, Tooltip } from '@material-ui/core';
import BaseDialog from '../../Base/BaseDialog';
import { makeStyles } from '@material-ui/core/styles';
import PhoneTextValidator from '../../Base/PhoneTextValidator';
import EmailTextValidator from '../../Base/EmailTextValidator';
import BaseTextValidator from '../../Base/BaseTextValidator';
import AddressDetails from './AddressDetails';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px 0px 20px 20px",
    },
    addIcon: {
        fill: "#1a73e8"
    },
    actionButton: {
        marginTop: "8px",
    },
    icon: {
      marginTop:"10px",
      marginBottom:"10px"
    }
}));
function Contact({ contactState, setContactState, types, title, contentType, icon, setIsDisabled }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState({ opens: [] });
    const [customField, setCustomField] = React.useState({ fields: types ? types.filter(element => element) : [] });
    const initCustomField = () => {
        contactState.items.forEach(item => {
            if (!customField.fields.includes(item.type)) {
                customField.fields.push(item.type)
                setCustomField(customField)
            }
        })
    }
    const initContact = () => {
        let list2 = open.opens;
        list2.push(false)
        setOpen({ opens: list2 })
        let list = contactState.items;
        if (types)
            if (contentType === "event")
                list.push({ info: null, type: types[list.length % types.length] })
            else if (contentType === "address")
                list.push({ street: "", POBox: "", neighborhood: "", city: "", state: "", zipCode: "", country: "", type: types[list.length % types.length] })
            else if (contentType === "field")
                list.push({ info: "", type: "" })
            else
                list.push({ info: "", type: types[list.length % types.length] })
        else
            list.push({ info: "" })
        return list;
    }
    const addContact = () => {
        setContactState({ ...contactState, items: initContact() })
        setIsDisabled(false)
    };
    useEffect(() => {
        if (contactState.items.length === 0)
            setContactState({ items: initContact() })
    })
    
    const changeContact = (e, index) => {
        let list = contactState.items;
        list[index] = { ...list[index], info: e.target.value }
        setContactState({ ...contactState, items: list })
        setIsDisabled(false)
    }

    const changephone = (e, index, value) => {
        let list = contactState.items;
        list[index] = { ...list[index], info:e.slice(value.dialCode.length+1), code:"+"+value.dialCode}
        setContactState({ ...contactState, items: list })
        setIsDisabled(false)
    }
    const changeDate = (e, index) => {
        let list = contactState.items;
        list[index] = { ...list[index], info: e }
        setContactState({ ...contactState, items: list })
        setIsDisabled(false)
    }
    const toggleDialog = (event, index) => {
        let list = open.opens;
        list[index] = !list[index];
        setOpen({ ...open, opens: list });
    }
    const closeDialog = (index) => {
        let list = open.opens;
        list[index] = !list[index];
        setOpen({ ...open, opens: list });
    }
    const changeType = (index, type) => {
        let list = contactState.items;
        list[index] = { ...list[index], type: type }
        setContactState({ ...contactState, items: list })
        setIsDisabled(false)
        if (!customField.fields.includes(type)) {
            customField.fields.push(type)
            setCustomField(customField)
        }
    }
    return (
        <Grid className={classes.root} container lg={6} md={7} sm={9} xs={11} direction="row" alignItems="stretch">
            {initCustomField()}
            <Grid item xs={2} sm={1}>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    className={classes.icon}>
                    <Tooltip title={title}>{icon}</Tooltip>
                </IconButton>
            </Grid>
            <Grid item xs={9} sm={10}>
            <Grid container direction="row" alignItems="stretch">
            {contactState.items.map((item, index) => (
                <React.Fragment>
                    <Grid item xs={11}>
                        <Grid container direction="row" alignItems="stretch">
                            <Grid item xs={12} sm={6}>
                            {contentType === 'phone' || contentType === 'IM' ?
                                console.log("itemmmm:",item):<></>}
                                {contentType === 'phone' || contentType === 'IM' ?
                                    <PhoneTextValidator
                                        required={true&&contentType === 'phone'}
                                        name={contentType + index}
                                        value={item.code?item.code+item.info:item.info}
                                        onChange={(e, value) => { changephone(e,index,value) }}
                                        label={title} />
                                : contentType === 'email' ?
                                    <EmailTextValidator
                                        required={true}
                                        name={contentType + index}
                                        value={item.info}
                                        onChange={(e) => { changeContact(e,index) }}
                                        label={title} />
                                : contentType === 'relationship' ?
                                    <BaseTextValidator
                                        name={contentType + index}
                                        value={item.info}
                                        onChange={(e) => { changeContact(e, index) }}
                                        label={title} />
                                : contentType === 'field' ?
                                    <BaseTextValidator
                                        name={contentType + index}
                                        value={item.info}
                                        onChange={(e) => { changeContact(e, index) }}
                                        label={title} />
                                : contentType === 'web' || contentType === 'SIP' ?
                                    <BaseTextValidator
                                        name={contentType + index}
                                        value={item.info}
                                        onChange={(e) => { changeContact(e, index) }}
                                        label={title} />
                                : contentType === 'note' ?
                                    <BaseTextValidator
                                        multiline={true}
                                        name={contentType + index}
                                        value={item.info}
                                        onChange={(e) => { changeContact(e, index) }}
                                        label={title} />
                                : contentType === 'event' ?
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            label="Date"
                                            value={item.info}
                                            onChange={(e) => { changeDate(e, index) }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                :<AddressDetails setIsDisabled={setIsDisabled} addressState={contactState} setAddressState={setContactState} index={index} />
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                        {types ?
                            <React.Fragment>
                                <Button variant="outlined" color="primary" onClick={(e) => { toggleDialog(e, index) }} className={classes.actionButton}>
                                    {item.type}
                                </Button>
                                <BaseDialog items={customField.fields}
                                    index={index}
                                    selectedValue={item.type}
                                    open={open.opens[index]}
                                    onClose={closeDialog}
                                    changeType={changeType} />
                            </React.Fragment>
                            : contentType === 'field' ?
                                <BaseTextValidator
                                    value={item.type}
                                    onChange={(e) => { 
                                        changeType(index, e.target.value)
                                        setIsDisabled(false)
                                    }}
                                    label={"Label"} />
                                : <React.Fragment />}
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            size="small"
                            className={classes.actionButton}
                            onClick={() => {
                                if (contactState.items.length > 1) setContactState({
                                    items: contactState.items.filter(element => element !== item)
                                })
                                setIsDisabled(false)
                            }}>
                            <Tooltip title="Delete">
                                <CloseIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                </React.Fragment>
            ))
            }
            </Grid>
            </Grid>
            <Grid item xs={1}>
            {contentType !== 'note' ?
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={addContact}>
                    <Tooltip title="Add">
                        <AddCircleOutlineIcon className={classes.addIcon} />
                    </Tooltip>
                </IconButton>
            : <React.Fragment />}
            </Grid> 
        </Grid>

    )
}
export default Contact;
