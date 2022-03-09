import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import API_CONFIG from '../../../../services/jwtService/apiConfig';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
    const apiurl = `${API_CONFIG.API_URL}/products/`;
    // const response = await axios.get('/api/e-commerce-app/product', { params });
    const response = await axios.get(apiurl + params.id);
    const data = await response.data;
    return data === undefined ? null : data;
});

export const removeProduct = createAsyncThunk(
    'eCommerceApp/product/removeProduct',
    async (val, { dispatch, getState }) => {
        const { id } = getState().eCommerceApp.product;
        const apiurl = `${API_CONFIG.API_URL}/products/delete`;
        // await axios.post('/api/e-commerce-app/remove-product', { id });
        await axios.post(apiurl, { id });
        return id;
    }
);

export const saveProduct = createAsyncThunk(
    'eCommerceApp/product/saveProduct',
    async (productData, { dispatch, getState }) => {
        const { product } = getState().eCommerceApp;
        if (productData.images) {
            productData.file = productData.images[0].binary;
        }
        let apiurl;
        if (product == null) {
            apiurl = `${API_CONFIG.API_URL}/products/add`;
        } else {
            if (productData.images) {
                productData.file = productData.images[0].binary;
            } else {
                productData.file = productData.small_image;
            }
            apiurl = `${API_CONFIG.API_URL}/products/update`;
        }
        const response = await axios.post(apiurl, { ...product, ...productData });
        const data = await response.data;
        return data;
    }
);

export const updateProduct = createAsyncThunk(
    'eCommerceApp/product/updateProduct',
    async (productData, { dispatch, getState }) => {
        const { product } = getState().eCommerceApp;
        productData.file = productData.images[0].binary;
        const apiurl = `${API_CONFIG.API_URL}/products/update`;
        const response = await axios.post('/api/e-commerce-app/product/save', { ...product, ...productData });
        const data = await response.data;
        return data;
    }
);

const productSlice = createSlice({
    name: 'eCommerceApp/product',
    initialState: null,
    reducers: {
        resetProduct: () => null,
        newProduct: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    id: FuseUtils.generateGUID(),
                    epid: '',
                    product_id: '',
                    bottler_id: '',
                    customer_id: '',
                    store_id: '',
                    name: '',
                    retail_price: '',
                    sale_price: '',
                    skuid: '',
                    small_image: '',
                    active: 'active',
                    availability: '',
                    description: '',
                    promotion: '',
                    size: '',
                    configuration: '',
                    color: '',
                    picture: '',
                    contract: '',
                    store: '',
                    file: '',
                    binary: '',
                    handle: ''
                }
            })
        }
    },
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => action.payload,
        [saveProduct.fulfilled]: (state, action) => action.payload,
        [updateProduct.fulfilled]: (state, action) => action.payload,
        [removeProduct.fulfilled]: (state, action) => null
    }
});

export const saveBulkImport = createAsyncThunk(
    'eCommerceApp/product/bulkimport',
    async (productData, { dispatch, getState }) => {
        const { file } = getState().eCommerceApp;
        const apiurl = `${API_CONFIG.API_URL}/products/bulkimport`;
        const response = await axios.post(apiurl, productData);
        const data = await response.data;

        return data;
    }
);

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
