import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {searchFilters} from '../filters/filtersSlice';

import TextField from '@mui/material/TextField';

const Search = () => {

    const searchError = useSelector(state => state.filters.searchError)
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const onInput = (e) => {
        const event = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        setSearch(event);
        dispatch(searchFilters(event));
    }

    return (
        <TextField 
            fullWidth 
            label="Название валюты" 
            id="search" 
            value={search}
            error={searchError}
            helperText={searchError ? "Incorrect entry." : null}
            onChange={onInput}
        />
    )
};
export default Search;