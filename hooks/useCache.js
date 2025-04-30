import { useRef } from "react";

const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000);

const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";

const useCache = (key, expiry) => {
    const cache = useRef(isBrowser ? JSON.parse(localStorage.getItem(key)) || {} : {});

    const setCache = (query, data) => {
        if (!isBrowser) return;

        const timestamp = getCurrentTimeStamp();
        cache.current[query] = { data, timestamp };
        localStorage.setItem(key, JSON.stringify(cache.current));
    };

    const getCache = (query) => {
        if (!isBrowser) return null;

        const cachedData = cache.current[query];
        if (cachedData) {
            const { data, timestamp } = cachedData;
            if (getCurrentTimeStamp() - timestamp < expiry) {
                return data;
            } else {
                delete cache.current[query];
                localStorage.setItem(key, JSON.stringify(cache.current));
            }
        }
        return null;
    };

    return {
        setCache,
        getCache
    };
};

export default useCache;