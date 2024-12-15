import Link from "next/link";
import { useRequest } from "../hooks";

export const Navbar = ({ user }) => {
    const { loading, makeRequest } = useRequest(
        "/api/auth/signout",
        "post",
    );
    const onSignOut = async () => {
        await makeRequest(() => {
            window.location.href = "/";
        });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand">
                    Ticketing
                </Link>
                <div className="d-flex">
                    {user ? (
                        <button
                            disabled={loading}
                            type="button"
                            className="text-danger outline-none border-0 bg-transparent"
                            onClick={onSignOut}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link href="/auth/signin" className="text-primary text-decoration-none me-3">
                                Sign In
                            </Link>
                            <Link href="/auth/signup" className="text-primary text-decoration-none">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
