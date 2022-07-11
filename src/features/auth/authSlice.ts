import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

const initialState = {
    token: null
} as { token: string | null }

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.token