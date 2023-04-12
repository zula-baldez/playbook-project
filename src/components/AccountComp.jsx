import '../style/AccountComp.css';

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export function AccountComp() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
            <div id = "account-widget">
                <List
                    sx={{bgcolor: 'white', height: '100%', margin:'0px', padding:'0px' }}
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
                            <ListItemButton sx={{bgcolor: 'white'}}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

            </div>
    );
}