import { authenticate } from "./api/authenticate"
import { authorize } from "./api/authorize"
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/store";
import {
    authenticateAction,
    authenticatedAction,
    authorizeAction,
    authorizedAction,
} from "./store/userSlice";

export function Header() {
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.user.loading);
    const dispatch = useDispatch();
    async function handleSignInClick() {
        dispatch(authenticateAction());
        const authenticatedUser = await authenticate();
        dispatch(authenticatedAction(authenticatedUser));
        if(authenticatedUser !== undefined) {
            dispatch(authorizeAction());
            const authorizedPermissions = await authorize(authenticatedUser.id);
            dispatch(authorizedAction(authorizedPermissions));
        }
    }
    return (
        <header className="flex justify-between items-center border-b-2">
            {user ? (
                <span className="ml-auto font-bold">{user.name} has signes in</span>
            ) : (
                <button
                    onClick={handleSignInClick}
                    className="bg-blue-700 text-white inline-flex rounded-md items-center justify-center ml-auto px-8 py-2"
                    disabled={loading}
                >
                    {loading ? '...' : "Sign in"}
                </button>
            )}
        </header>
    )
}