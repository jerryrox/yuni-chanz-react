import { createContext } from "react";
import DependencyContainer from "./DependencyContainer";
import IDependencyContainer from "./IDependencyContainer";

const DependencyContext = createContext<IDependencyContainer>(new DependencyContainer());
export default DependencyContext;