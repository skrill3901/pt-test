import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchValutes } from './valutesSlice';
import { changeSearchError } from '../filters/filtersSlice';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const filtersFunc = (arr, val) => {
  arr.sort((x, y) => {
      x = x[val].split(".")
      y = y[val].split(".")
      if (x[0].slice(0, 1) === '-') {
          x[1] = '-' + x[1];
      }
      if (y[0].slice(0, 1) === '-') {
          y[1] = '-' + y[1];
      }
      return y[0] - x[0] || y[1] - x[1]
  })
  return arr;
}

const columns = [
  { id: 'Name', label: 'Наименование', minWidth: 350 },
  { id: 'CharCode', label: 'Код', minWidth: 100 },
  {
    id: 'Value',
    label: 'Курс',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('ru-RU'),
  },
  {
    id: 'Dynamic',
    label: 'Динамика изменений',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('ru-RU'),
  },
];

const ValuteList = () => {

  const {activeFilter, searchFilter} = useSelector(state => state.filters);
  const {valutesLoadingStatus, valutes, updateInterval} = useSelector(state => state.valutes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const dispatch = useDispatch();

  const filteredValutes = useMemo(() => {
    const filteredValutes = valutes.slice().filter(((item) => {
      return item.Name.indexOf(searchFilter) > -1
    }))
    switch (activeFilter) {
      case 'all':
        return filteredValutes;
      case 'Name':
        return filteredValutes.sort((a, b) => a.Name > b.Name ? 1 : -1);
      case 'Value':
        return filtersFunc(filteredValutes, 'Value');
      case 'Dynamic':
        return filtersFunc(filteredValutes, 'Dynamic');
      default:
        return filteredValutes;
    }
  }, [valutes, activeFilter, searchFilter]);

  useEffect(() => {
      dispatch(fetchValutes());
  }, [])

  useEffect(() => {
    if (valutes.length > 0 && filteredValutes.length === 0) {
      dispatch(changeSearchError(true));
    } else {
      dispatch(changeSearchError(false));
    }
  }, [searchFilter])

  useEffect(() => {
    if (!updateInterval || valutesLoadingStatus === 'loading') return;
    const timeoutId = setTimeout(() => {
      dispatch(fetchValutes())}, updateInterval);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [valutesLoadingStatus])

  if (valutesLoadingStatus === 'loading') {
      return (
        <Box sx={{ position: 'absolute', left: '37%', top: '45%' }}>
          <CircularProgress />
        </Box>
      );
  } else if (valutesLoadingStatus === 'error') {
      return <Box sx={{ position: 'absolute', left: '37%', top: '45%' }}>
              Ошибка загрузки
            </Box>
  }

  const renderFunc = (arr) => {
      if (arr.length === 0) {
        return  <Box sx={{ display: 'flex', position: 'absolute', left: '37%', top: '45%' }} id="empty">
                  Данных пока нет
                </Box>
      }
      return arr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={item.ID}>
              {columns.map((column) => {
                const value = item[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          )
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const elements = renderFunc(filteredValutes);

  return (
      <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: '91vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
              {elements}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={valutes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ValuteList;