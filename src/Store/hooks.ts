import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppselectore: TypedUseSelectorHook<Rootstate> = useSelector