import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import { saveProduct, updateProduct, removeProduct } from '../store/productSlice';

function ProductHeader(props) {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('name');
    const theme = useTheme();
    const history = useHistory();
    const routeParams = useParams();
    const { productId } = routeParams;

    function handleSaveProduct() {
        dispatch(saveProduct(getValues())).then(() => {
            history.push('/apps/e-commerce/products');
            dispatch(showMessage({ message: 'Product Saved successfully!!!' }));
        });
    }

    function handleUpdateProduct() {
        dispatch(updateProduct(getValues())).then(() => {
            history.push('/apps/e-commerce/products');
            dispatch(showMessage({ message: 'Product Updated successfully!!!' }));
        });
    }

    function handleRemoveProduct() {
        dispatch(removeProduct()).then(() => {
            history.push('/apps/e-commerce/products');
            dispatch(showMessage({ message: 'Product Removed successfully!!!' }));
        });
    }

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/e-commerce/products"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Products</span>
                    </Typography>
                </motion.div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                {routeParams.id === 'new' ? (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSaveProduct}
                    >
                        Save
                    </Button>
                ) : (
                    <div>
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            onClick={handleRemoveProduct}
                            startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                        >
                            Remove
                        </Button>
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            onClick={handleSaveProduct}
                        >
                            Update
                        </Button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default ProductHeader;
