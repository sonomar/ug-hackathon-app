import { apiBase } from "./apiBase";

const donateApi = apiBase.injectEndpoints({
    endpoints: (builder) => ({
        donate: builder.mutation({
            query: (params) => ({
                url: "donate",
                method: "PUT",
                body: params,
            }),
        })
    }),
    overrideExisting: true
});

export const {useDonateMutation} = donateApi;