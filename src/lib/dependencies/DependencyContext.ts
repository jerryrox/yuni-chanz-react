import { createContext } from "react";
import { BlocContextValue } from "bindable-bloc";

const DependencyContext = createContext<BlocContextValue>(new BlocContextValue());
export default DependencyContext;