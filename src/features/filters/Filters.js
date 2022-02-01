import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeFilters } from './filtersSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Filters = () => {

    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');

    const onFilter = (e) => {
        const event = e.target.value;
        dispatch(changeFilters(event));
        setFilter(event);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="filters">Фильтр</InputLabel>
            <Select
                labelId="filters"
                id="filters"
                value={filter}
                label="Фильтер"
                onChange={onFilter}
            >
                <MenuItem value={'all'}>Без фильтра</MenuItem>
                <MenuItem value={'Name'}>Наименование</MenuItem>
                <MenuItem value={'Value'}>Курс к рублю</MenuItem>
                <MenuItem value={'Dynamic'}>Динамика изменений</MenuItem>
            </Select>
        </FormControl>
    )
};
export default Filters;