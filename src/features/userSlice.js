import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`

const initialState = {
  status: 'loading',
  error: '',
  user: {
    id: '',
    name: '',
    email: '',
    picture: '',
    status: '',
    token: '',
  },
}

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values, // here we are spreading all the values  to pass all the properties of one object as separate properties in another object
      })

      return data // we return the response , that we got from server
    } catch (error) {
      //this error message we get from the backend
      return rejectWithValue(error.response.data.error.message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.status = ''
      state.error = ''
      state.user = {
        id: '',
        name: '',
        email: '',
        picture: '',
        status: '',
        token: '',
      }
    },
  },
  extraReducers(builder) { 
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
