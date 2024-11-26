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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <Link href="/" className="navbar-brand">
                  Ticketing
              </Link>
              <div className="d-flex">
                  {user ? (
                      <button
                          disabled={loading}
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={onSignOut}
                      >
                          Sign Out
                      </button>
                  ) : (
                      <>
                          <Link href="/auth/signin" className="btn btn-outline-primary me-2">
                              Sign In
                          </Link>
                          <Link href="/auth/signup" className="btn btn-primary">
                              Sign Up
                          </Link>
                      </>
                  )}
              </div>
          </div>
      </nav>
  )
}
