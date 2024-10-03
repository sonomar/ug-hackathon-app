import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";

export const useAuth = () => {
    const cred = useSelector(selectAuth);
    return useMemo(() => ({ cred }), [cred]);
}