import Link from "next/link";
import { useRequest } from "../hooks";
import { axiosInstace } from "../lib/api/config";

Home.getInitialProps = async (context) => {
    try {
        const { data } = await axiosInstace(context).get("/api/auth/currentuser");
        return data;
    } catch (error) {
        return { user: null };
    }
};

export default function Home({ user }) {
    const { loading, makeRequest } = useRequest(
        "/api/auth/signout",
        "post",
    );
    const logout = async () => {
        await makeRequest(() => {
            window.location.href = "/";
        });
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 flex-column gap-5">
            <h3>{"Welcome " + (user ? user.email : "Guest")}</h3>
            {!user &&
                <div className="d-flex gap-3 align-items-center">
                    <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
                    <Link href="/auth/signup" className="btn btn-primary">Sign Up</Link>
                </div>
            }
            {
                user &&
                <button
                    onClick={logout}
                    type="button"
                    disabled={loading}
                    className="btn btn-danger"
                >
                    Sign Out
                </button>
            }
        </div>
    );
}