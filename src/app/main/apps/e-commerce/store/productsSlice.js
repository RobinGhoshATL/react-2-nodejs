import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import API_CONFIG from '../../../../services/jwtService/apiConfig';

export const getProducts = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
    // const apiurl = 'https://bottlernodeapiservice.azurewebsites.net/api/products';
    const apiurl = `${API_CONFIG.API_URL}/products`;
    // console.log('in productsslice.js');
    const response = await axios.get(apiurl);
    const data = await response.data;
    return data;
});

export const removeProducts = createAsyncThunk(
    'eCommerceApp/products/removeProducts',
    async (productIds, { dispatch, getState }) => {
        await axios.post('/api/e-commerce-app/remove-products', { productIds });

        return productIds;
    }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
    state => state.eCommerceApp.products
);

const productsSlice = createSlice({
    name: 'eCommerceApp/products',
    initialState: productsAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setProductsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getProducts.fulfilled]: productsAdapter.setAll,
        [removeProducts.fulfilled]: (state, action) => productsAdapter.removeMany(state, action.payload)
    }
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
