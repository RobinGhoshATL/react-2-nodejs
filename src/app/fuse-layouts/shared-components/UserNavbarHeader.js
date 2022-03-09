import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import { logoutUser } from 'app/auth/store/userSlice';

const useStyles = makeStyles(theme => ({
    root: {
        '&.user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        background: theme.palette.background.default,
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut
        }),
        bottom: 0,
        '& > img': {
            borderRadius: '50%'
        }
    }
}));

function UserNavbarHeader(props) {
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    const username = user.name;
    const names = username.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return (
        <AppBar
            position="static"
            color="primary"
            classes={{ root: classes.root }}
            className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
        >
            <div className="flex items-center justify-center  bottom-0 -mb-44">
                {/* <Avatar
					className={clsx(classes.avatar, 'avatar w-72 h-72 p-8 box-content')}
					alt="user photo"
					src={
						user.profilepic && user.profilepic !== ''
							? user.profilepic
							: 'assets/images/avatars/profile.jpg'
					}
				/> */}
                {user.profilepic ? (
                    <Avatar
                        className="md:mx-4 avatar w-68 h-68 p-8 box-content"
                        alt="user photo"
                        src={user.profilepic}
                    />
                ) : (
                    <Avatar className="md:mx-4 avatar w-68 h-68 p-8 box-content text-white">{initials}</Avatar>
                )}
            </div>
            <div className="items-center justify-center absolute bottom-0 -mb-44">
                <Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
                    {user.name}
                </Typography>
                <Typography className="text-8 cursor-pointer text-center" color="inherit">
                    <Icon
                        className="text-18 mx-4"
                        onClick={() => {
                            dispatch(logoutUser());
                        }}
                    >
                        exit_to_app
                    </Icon>
                </Typography>
            </div>
        </AppBar>
    );
}

export default UserNavbarHeader;
