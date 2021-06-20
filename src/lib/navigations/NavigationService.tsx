import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useDependency from "../dependencies/UseDependency";
import Navigation from "./Navigation";

const NavigationService = () => {
    const navigation = useDependency(Navigation)!;

    const history = useHistory();

    useEffect(() => {
        navigation.setHistory(history);
    }, [history]); // eslint-disable-line

    return null;
};
export default NavigationService;