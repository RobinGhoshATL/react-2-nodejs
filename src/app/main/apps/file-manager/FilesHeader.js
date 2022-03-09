import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import { useState, React } from 'react';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { showMessage } from 'app/store/fuse/messageSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { saveFile, getFiles, setFilesSearchText } from './store/filesSlice';

let newImage;
function FilesHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
    const mainTheme = useSelector(selectMainTheme);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSaveFile = () => {
        setOpen(false);
        dispatch(saveFile(newImage)).then(() => {
            dispatch(showMessage({ message: 'File Uploaded Successfully!!!' }));
            dispatch(getFiles());
        });
    };
    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center">
                <Icon
                    component={motion.span}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: 0.2 } }}
                    className="text-24 md:text-32"
                >
                    shopping_basket
                </Icon>
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
                >
                    Files
                </Typography>
            </div>
            <div className="flex flex-1 items-center justify-center px-12">
                <ThemeProvider theme={mainTheme}>
                    <Paper
                        component={motion.div}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                    >
                        <Icon color="action">search</Icon>
                        <Input
                            placeholder="Search"
                            className="flex flex-1 mx-8"
                            disableUnderline
                            fullWidth
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={ev => dispatch(setFilesSearchText(ev))}
                        />
                    </Paper>
                </ThemeProvider>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
                <Button className="whitespace-nowrap" variant="contained" color="secondary" onClick={handleClickOpen}>
                    <span className="hidden sm:flex">Add New File</span>
                    <span className="flex sm:hidden">Add New File</span>
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New File</DialogTitle>
                    <DialogContent>
                        <div id="upload-box">
                            <input
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg, .txt"
                                onChange={async e => {
                                    function readFileAsync() {
                                        return new Promise((resolve, reject) => {
                                            const file = e.target.files[0];
                                            if (!file) {
                                                return;
                                            }
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                resolve({
                                                    file,
                                                    binary: `data:${file.type};base64,${btoa(reader.result)}`
                                                });
                                            };
                                            reader.onerror = reject;
                                            reader.readAsBinaryString(file);
                                        });
                                    }
                                    newImage = await readFileAsync();
                                }}
                            />
                            <p className="text-10 mt-5 opacity-60">Supports .TXT, .JPEG, .JPG, .PNG </p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveFile} color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </div>
    );
}

export default FilesHeader;
