import '../style/AccountComp.css';

import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {makeStyles} from '@mui/styles';
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    listItemButton: {
        '&:hover': {
            backgroundColor: 'black !important',
            color: 'white !important'
        },
    },
}));

export function AccountComp() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const classes = useStyles();

    return (

        <div id="account-widget">
            <List
                sx={{bgcolor: 'white', height: '100%', margin: '0px', padding: '0px'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >


                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Username" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton className={classes.listItemButton} sx={{bgcolor: 'white'}}>
                                <ListItemIcon>
                                    <StarBorder/>
                                </ListItemIcon>
                                <ListItemText primary="Account"/>
                            </ListItemButton>
                            <ListItemButton className={classes.listItemButton} sx={{bgcolor: 'white'}}>
                                <ListItemIcon>
                                    <StarBorder/>
                                </ListItemIcon>
                                <ListItemText primary="My strategies"/>
                            </ListItemButton>
                            <ListItemButton onClick={(event) => {
                                console.log("log out!")
                                navigate("/login")
                            }}
                                            className={classes.listItemButton} sx={{bgcolor: 'white'}}>
                                <ListItemIcon>
                                    <StarBorder/>
                                </ListItemIcon>
                                <ListItemText primary="Log out"/>
                            </ListItemButton>
                        </List>
                    </Collapse>

            </List>

            </div>
    );
}