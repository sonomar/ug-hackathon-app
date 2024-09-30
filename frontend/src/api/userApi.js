import { apiBase } from "./apiBase";

const userApi = apiBase.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({username, password}) => ({
                url: "login",
                method: "POST",
                body: {username, password}
            }),
        })
    }),
    overrideExisting: true
});

export const { useLoginMutation } = userApi;