import { useState, useEffect } from "react";

/**
 * Un hook personnalisé pour gérer le debounce d'une valeur.
 * @param {any} value La valeur à debouncer.
 * @param {number} delay Le délai en millisecondes avant de renvoyer la dernière valeur.
 * @returns La dernière valeur après le délai spécifié.
 */

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
