import { apiBase } from "./apiBase";

const receitpApi = apiBase.injectEndpoints({
    endpoints: (builder) => ({
        getAllReceipts: builder.query({
            query: () => "receipts",
        }),
        getAllCountries: builder.query({
            query: () => "countries",
        })
    }),
    overrideExisting: true
});

export const { useGetAllReceiptsQuery, useGetAllCountriesQuery } = receitpApi;