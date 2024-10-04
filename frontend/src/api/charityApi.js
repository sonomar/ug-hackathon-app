import { apiBase } from "./apiBase";

const charitypApi = apiBase.injectEndpoints({
    endpoints: (builder) => ({
        getAllCharities: builder.query({
            query: () => "charities",
        }),
        getCharityById: builder.query({
            query: (id) => `charity/${id}`,
        })
    }),
    overrideExisting: true
});

export const { useGetAllCharitiesQuery, useGetCharityByIdQuery } = charitypApi;