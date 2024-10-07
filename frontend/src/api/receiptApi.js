import { apiBase } from "./apiBase";

const receitpApi = apiBase.injectEndpoints({
    endpoints: (builder) => ({
        getAllReceipts: builder.query({
            query: () => "receipts",
        }),
        getAllCountries: builder.query({
            query: () => "countries",
        }),
        getAllReceiptsGroupByDate: builder.query({
            query: () => "receipts",
            transformResponse: (response) => {
                return Object.values(Object.groupBy(response, ({date}) => new Date(date).toLocaleDateString()));
            }
        }),
    }),
    overrideExisting: true
});

export const { useGetAllReceiptsQuery, useGetAllCountriesQuery, useGetAllReceiptsGroupByDateQuery } = receitpApi;