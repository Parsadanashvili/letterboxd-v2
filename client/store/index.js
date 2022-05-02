import {configureStore} from '@reduxjs/toolkit'

import Auth from './Auth'

const store = configureStore({
    reducer: {
        auth: Auth.reducer
    }
})

export default store;