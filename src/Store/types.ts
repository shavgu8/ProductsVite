import { store } from "./store";

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch