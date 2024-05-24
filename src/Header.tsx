import { User } from "./api/authenticate";

type Props = {
    user: undefined | User;
    onSignInClick: () => void;
    loading: boolean;
}

export function Header({ user, onSignInClick, loading }: Props) {
    return (
        <header className="flex justify-between items-center border-b-2">
            {user ? (
                <span className="ml-auto font-bold">{user.name} has signes in</span>
            ) : (
                <button
                    onClick={onSignInClick}
                    className="whitespace-nowrap inline-flex items-center justify-center ml-auto px-4 py-4"
                    disabled={loading}
                >
                    {loading ? '...' : "Sign in"}
                </button>
            )}
        </header>
    )
}