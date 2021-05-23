import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function useQueryParams() {
    const location = useLocation();
    const params = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);
    return params;
}