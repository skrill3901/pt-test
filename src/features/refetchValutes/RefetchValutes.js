import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { fetchValutes } from '../valutesList/valutesSlice';

import LoadingButton from '@mui/lab/LoadingButton';

const RefetchValutes = () => {

    const dispatch = useDispatch();
    const valutesLoadingStatus = useSelector(state => state.valutes.valutesLoadingStatus);
    const [refetch, setRefetch] = useState(true);
    const data = useSelector(state => state.valutes.previousDate);

    useEffect(() => {
        if (valutesLoadingStatus === 'loading') {
            setRefetch(true);
        } else if (valutesLoadingStatus === 'error' || valutesLoadingStatus === 'idle') {
            setRefetch(false);
        }
    }, [valutesLoadingStatus])

    return (
        <div className='refetch'>
            <LoadingButton 
                loading={refetch} 
                loadingIndicator="Loading..." 
                variant="outlined"
                onClick={() => dispatch(fetchValutes())}
            >
                Обновить
            </LoadingButton>
            <div className='data-upd'>
                Дата последнего обновления: {data.slice(0, 10)}
            </div>
        </div>
    )
};
export default RefetchValutes;