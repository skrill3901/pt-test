import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';
import transformFunc from '../../utils/transformFunc';

const initialState = {
    valutes: [],
    valutesLoadingStatus: 'loading',
    previousDate: '',
    updateInterval: 0,
}

export const fetchValutes = createAsyncThunk(
    'valutes/fetchValutes',
    () => {
        const {request} = useHttp();
        return request("https://www.cbr-xml-daily.ru/daily_json.js");
    }
)

const valutesSlice = createSlice({
    name: 'valutes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchValutes.pending, state => {state.valutesLoadingStatus = 'loading'})
            .addCase(fetchValutes.fulfilled, (state, action) => {
                state.valutesLoadingStatus = 'idle';
                state.valutes = transformFunc(action.payload);
                state.previousDate = action.payload.PreviousDate;
                state.updateInterval = 30000;
            })
            .addCase(fetchValutes.rejected, state => {state.valutesLoadingStatus = 'error'})
    }
});

const {reducer} = valutesSlice;

export default reducer;