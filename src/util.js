export const grtValidFilters = (filters) => {
    const validFilters = {};

    for (const key in filters) {
        if (Object.hasOwnProperty.call(filters, key) && filters[key]) {
            validFilters[key] = filters[key];
        }
    }

    return validFilters;
};

export const debounce = (fn, ms) => {
    let lastCall = 0;
    let lastCallTimer = 0;

    return (...arg) => {
        const prevCall = lastCall;
        lastCall = Date.now();
        if(prevCall && lastCall - prevCall <= ms) {
            clearTimeout(lastCallTimer);
        }

        lastCallTimer = setTimeout( () => {
            fn(...arg);
        }, ms);
    };
};