import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface QueryParams {
  pagesize: number
  sort: 'popular' | 'activity' | 'name'
  order: 'asc' | 'desc'
}

export const fetchTags = createAsyncThunk(
  'tag/fetchTags',
  async (params: QueryParams) => {
    try {
      const { pagesize, sort, order } = params
      const url =
        `https://api.stackexchange.com/2.3/tags?` +
        new URLSearchParams({
          pagesize: pagesize.toString(),
          sort,
          order,
          site: 'stackoverflow',
        })
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_message)
      }
      const rows = data.items.map((item: any) => [item.name, item.count])
      return rows
    } catch (error) {
      throw error
    }
  },
)

interface State {
  rows: []
  loading: boolean
  error: string | null
}

const initialState: State = {
  rows: [],
  loading: false,
  error: null,
}

const tagSlice = createSlice({
  name: 'tag',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.rows = action.payload
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.rows = []
        state.loading = false
        state.error = action.error.message ?? 'Error.'
      })
  },
})

export default tagSlice.reducer
