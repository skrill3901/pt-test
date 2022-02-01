import { configureStore} from '@reduxjs/toolkit';

import valutes from '../features/valutesList/valutesSlice';
import filters from '../features/filters/filtersSlice';

const store = configureStore({
  reducer: {
    valutes,
    filters
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;