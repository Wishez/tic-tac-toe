import { configureStore } from '@reduxjs/toolkit'
import { reducer as game } from './game/reducer'
import { chooseCell } from './actions'

export const store = configureStore({
  reducer: {
    game,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions: [chooseCell.type] } }),
})
