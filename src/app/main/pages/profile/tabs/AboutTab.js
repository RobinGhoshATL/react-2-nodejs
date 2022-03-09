import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function AboutTab() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/profile/about').then(res => {
            setData(res.data);
        });
    }, []);

    if (!data) {
        return null;
    }

    const { general, work, contact, groups, friends } = data;

    const container = {
        show: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <div className="md:flex max-w-2xl">
                <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
                    <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="px-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                                    Contact Information
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-semibold mb-4 text-15">Address</Typography>
                                <Typography>{contact.address}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-semibold mb-4 text-15">Tel.</Typography>

                                {contact.tel.map(tel => (
                                    <div className="flex items-center" key={tel}>
                                        <Typography>{tel}</Typography>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-semibold mb-4 text-15">Website</Typography>

                                {contact.websites.map(website => (
                                    <div className="flex items-center" key={website}>
                                        <Typography>{website}</Typography>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-semibold mb-4 text-15">Emails</Typography>

                                {contact.emails.map(email => (
                                    <div className="flex items-center" key={email}>
                                        <Typography>{email}</Typography>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default AboutTab;
