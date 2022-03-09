import { useRef, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import FuseUtils from '@fuse/utils';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import { useFormContext, Controller } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ payload: { ...this.state.payload, [file]: btoa(reader.result) } });
        };
        reader.readAsBinaryString(file);
    }
}

function BasicInfoTab(props) {
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, watch, formState } = methods;
    const { errors } = formState;
    const images = watch('images', []);
    const smallImage = watch('small_image');
    const routeParams = useParams();
    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.name?.message}
                        label="Name"
                        autoFocus
                        id="name"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="description"
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Description"
                        type="text"
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="skuid"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="SKU"
                        id="skuid"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="retail_price"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="Retail Price"
                        id="retail_price"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="sale_price"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="Sale Price"
                        id="sale_price"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="small_image"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="Url"
                        required
                        id="small_image"
                        InputLabelProps={{
                            shrink: true
                        }}
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            {/* <Controller
                name="images"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <label
                        htmlFor="button-file"
                        className={clsx(
                            classes.productImageUpload,
                            'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                        )}
                    >
                        <input
                            accept="image/*"
                            className="hidden"
                            id="button-file"
                            type="file"
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
                                                id: FuseUtils.generateGUID(),
                                                binary: `data:${file.type};base64,${btoa(reader.result)}`,
                                                type: 'image'
                                            });
                                        };
                                        reader.onerror = reject;
                                        reader.readAsBinaryString(file);
                                    });
                                }
                                const newImage = await readFileAsync();
                                onChange([newImage]);
                            }}
                        />
                        <Tooltip title="Upload Image">
                            <Icon fontSize="large" color="action">
                                cloud_upload
                            </Icon>
                        </Tooltip>
                    </label>
                )}
            />
            {routeParams.id === 'new' ? (
                <Controller
                    name="featuredImageId"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) =>
                        images.map(media => (
                            <div
                                onClick={() => onChange(media.id)}
                                onKeyDown={() => onChange(media.id)}
                                role="button"
                                tabIndex={0}
                                className={clsx(
                                    classes.productImageItem,
                                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                                    media.id === value && 'featured'
                                )}
                                key={media.id}
                            >
                                <img className="max-w-none w-auto h-full" src={media.binary} alt="product" />
                            </div>
                        ))
                    }
                />
            ) : (
                <Controller
                    name="small_image"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <div
                            role="button"
                            tabIndex={0}
                            label="Product Image"
                            className={clsx(
                                classes.productImageItem,
                                'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
                            )}
                        >
                            <img className="max-w-none w-auto h-full" src={smallImage} alt="product" />
                        </div>
                    )}
                /> */}
            {/* )} */}
        </div>
    );
}

export default BasicInfoTab;
