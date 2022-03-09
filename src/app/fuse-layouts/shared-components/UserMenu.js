import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';

function UserMenu(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };
    const username = user.name;
    const names = username.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return (
        <>
            <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
                <div className="hidden md:flex flex-col mx-4 items-end">
                    <Typography component="span" className="font-semibold flex">
                        {user.name}
                    </Typography>
                </div>

                {user.profilepic ? (
                    <Avatar className="md:mx-4" alt="user photo" src={user.profilepic} />
                ) : (
                    <Avatar className="md:mx-4 ">{initials}</Avatar>
                )}
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: 'py-8'
                }}
            >
                {!user.role || user.role.length === 0 ? (
                    <>
                        <MenuItem
                            onClick={() => {
                                dispatch(logoutUser());
                                userMenuClose();
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem
                            onClick={() => {
                                dispatch(logoutUser());
                                userMenuClose();
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem>
                    </>
                )}
            </Popover>
        </>
    );
}

export default UserMenu;
