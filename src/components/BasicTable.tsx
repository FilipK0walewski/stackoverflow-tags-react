import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useRef } from 'react'

const headerCellStyle = {
  backgroundColor: 'white',
  fontWeight: '600',
}

interface Props {
  columns: string[]
  rows: (string | number)[][]
  loading?: boolean
}

const BasicTable = ({ columns, rows, loading = false }: Props) => {
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    if (rows.length !== 0 && tableRef.current) {
      tableRef.current.scrollTo(0, 0)
    }
  }, [rows])

  return (
    <>
      <TableContainer
        component={Paper}
        ref={tableRef}
        className="table-container"
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          opacity: loading === true ? '75%' : '100%',
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{ position: 'absolute', top: '100px', left: '50%' }}
          />
        ) : null}
        <Table stickyHeader aria-label="basic table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  sx={headerCellStyle}
                  key={column}
                  align={index === 0 ? 'left' : 'right'}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={`row-${rowIndex}-cell-${cellIndex}`}
                    align={cellIndex === 0 ? 'left' : 'right'}
                    component="th"
                    scope="row"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BasicTable
