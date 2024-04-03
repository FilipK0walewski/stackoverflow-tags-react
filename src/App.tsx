import { useEffect, useState } from 'react'

import BasicSelect from './components/BasicSelect'
import BasicTable from './components/BasicTable'
import PagesizeInput from './components/PagesizeInput'

import { useAppSelector, useAppDispatch } from './store/hooks'
import { fetchTags } from './store/tagSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const rows = useAppSelector((state) => state.tag.rows)
  const loading = useAppSelector((state) => state.tag.loading)
  const error = useAppSelector((state) => state.tag.error)

  const [pagesize, setPagesize] = useState(50)
  const [sort, setSort] = useState<'popular' | 'activity' | 'name'>('popular')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const handlePagesizeChange = (newPagesize: number) => {
    setPagesize(newPagesize)
  }

  const handleSortChange = (value: string) => {
    if (value === 'popular' || value === 'activity' || value === 'name') {
      setSort(value)
    }
  }

  const handleOrderChange = (value: string) => {
    if (value === 'asc' || value === 'desc') {
      setOrder(value)
    }
  }

  const fetchStackOverflowTags = () => {
    if (loading === false) {
      dispatch(fetchTags({ pagesize, sort, order }))
    }
  }

  useEffect(() => {
    fetchStackOverflowTags()
  }, [pagesize, sort, order])

  return (
    <div className="content-container">
      <div className="inputs-container">
        <PagesizeInput
          label="Pagesize"
          initValue={pagesize}
          disabled={loading}
          onChange={handlePagesizeChange}
          minValue={1}
          maxValue={100}
        />
        <BasicSelect
          label="Sort"
          defaultValue={sort}
          disabled={loading}
          options={[
            { label: 'Popular', value: 'popular' },
            { label: 'Activity', value: 'activity' },
            { label: 'Name', value: 'name' },
          ]}
          onChange={handleSortChange}
        />
        <BasicSelect
          label="Order"
          defaultValue={order}
          disabled={loading}
          options={[
            { label: 'Ascending', value: 'asc' },
            { label: 'Descending', value: 'desc' },
          ]}
          onChange={handleOrderChange}
        />
      </div>

      {error !== null ? (
        <p className="error-message">{error}</p>
      ) : (
        <BasicTable columns={['Name', 'Count']} rows={rows} loading={loading} />
      )}
    </div>
  )
}

export default App
