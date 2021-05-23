import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useBloc from "../dependencies/UseBloc";
import Navigation from "./Navigation";

const NavigationService = () => {
    const navigation = useBloc(Navigation);

    const history = useHistory();

    useEffect(() => {
        navigation.setHistory(history);
    }, [history]); // eslint-disable-line

    return null;
};
export default NavigationService;