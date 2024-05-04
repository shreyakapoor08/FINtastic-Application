// Author -
// Dhrumil Gosaliya
import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function Notification({ open, onClose, notifications }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ width: '50%', bgcolor: 'background.paper', p: 4, overflow: 'auto' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Notifications
                </Typography>
                <List>
                    {notifications.map((notification, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={notification.message} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
}

export default Notification;
