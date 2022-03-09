import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import API_CONFIG from '../../../../services/jwtService/apiConfig';

export const getFiles = createAsyncThunk('fileManagerApp/files/getFiles', async () => {
    const apiurl = `${API_CONFIG.API_URL}/file`;
    const response = await axios.get(apiurl);
    const data = await response.data;

    return data;
});
const filesAdapter = createEntityAdapter({});
export const {
    selectAll: selectFiles,
    selectEntities: selectFilesEntities,
    selectById: selectFileById
} = filesAdapter.getSelectors(state => state.fileManagerApp.files);
const filesSlice = createSlice({
    name: 'fileManagerApp/files',
    initialState: filesAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setFilesSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getFiles.fulfilled]: filesAdapter.setAll
    }
});
export const saveFile = createAsyncThunk('fileManagerApp/files/saveFile', async (fileData, { dispatch, getState }) => {
    const { file } = getState().fileManagerApp;
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('binary', fileData.binary);
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    };
    const apiurl = `${API_CONFIG.API_URL}/file/add`;
    const response = await axios.post(apiurl, formData, config);
    const data = await response.data;
    return data;
});
export const { setFilesSearchText } = filesSlice.actions;
export default filesSlice.reducer;
