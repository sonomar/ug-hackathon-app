import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiBase = createApi({
    reducerPath: "apiBase",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL? process.env.REACT_APP_API_BASE_URL: "/api",
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token){
                headers.set("authorization", "Bearer ${token}");
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});