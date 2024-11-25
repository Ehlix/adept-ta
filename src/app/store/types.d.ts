declare type RootState = ReturnType<typeof import('./store').mainStore.getState>
declare type AppDispatch = typeof import('./store').mainStore.dispatch
