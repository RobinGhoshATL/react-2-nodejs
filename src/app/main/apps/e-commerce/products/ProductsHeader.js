import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, React } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getProducts, setProductsSearchText } from '../store/productsSlice';
import { saveBulkImport } from '../store/productSlice';

let newProducts;
function ProductsHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
    const mainTheme = useSelector(selectMainTheme);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleBulkImport = () => {
        setOpen(false);
        dispatch(saveBulkImport(newProducts)).then(() => {
            dispatch(showMessage({ message: 'Products Added Successfully!!!' }));
            dispatch(getProducts());
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
                    Products
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
                            onChange={ev => dispatch(setProductsSearchText(ev))}
                        />
                    </Paper>
                </ThemeProvider>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
                <Button
                    component={Link}
                    to="/apps/e-commerce/products/new"
                    className="whitespace-nowrap"
                    variant="contained"
                    color="secondary"
                >
                    <span className="hidden sm:flex">Add Product</span>
                    <span className="flex sm:hidden">Add Product</span>
                </Button>
                &nbsp;
                <Button className="whitespace-nowrap" variant="contained" color="secondary">
                    <span
                        className="hidden sm:flex"
                        role="presentation"
                        onClick={handleClickOpen}
                        onKeyDown={handleClickOpen}
                    >
                        Bulk Import
                    </span>
                    <span className="flex sm:hidden">Bulk Import</span>
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Import Products</DialogTitle>
                    <DialogContent>
                        <div id="upload-box">
                            <input
                                type="file"
                                accept=".json"
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
                                                    data: reader.result
                                                });
                                            };

                                            reader.onerror = reject;

                                            reader.readAsText(file);
                                        });
                                    }

                                    newProducts = await readFileAsync();
                                }}
                            />
                            <p className="text-10 mt-5 opacity-60">Supports .JSON </p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleBulkImport} color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </div>
    );
}

export default ProductsHeader;
