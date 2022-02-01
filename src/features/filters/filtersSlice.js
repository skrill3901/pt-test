import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchFilter: '',
    activeFilter: 'all',
    searchError: false,
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        searchFilters: (state, action) => {
            state.searchFilter = action.payload;
        },
        changeFilters: (state, action) => {
            state.activeFilter = action.payload;
        },
        changeSearchError: (state, action) => {
            state.searchError = action.payload;
        }
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    searchFilters,
    changeFilters,
    changeSearchError
} = actions;