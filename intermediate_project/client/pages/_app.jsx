import "bootstrap/dist/css/bootstrap.css";
import { Navbar } from "../components/navbar";
import { axiosInstace } from "../lib/api/config";

export default function App({ Component, pageProps, user }) {
    return (
        <div>
            <Navbar user={user} />
            <Component user={user} {...pageProps} />
        </div>
    );
}

App.getInitialProps = async (context) => {
    try {
        const { data } = await axiosInstace(context.ctx).get("/api/auth/currentuser");
        let pageProps = {};
        if (context.Component.getInitialProps) {
            pageProps = await context.Component.getInitialProps(context.ctx, data.user);
        }
        return {
            pageProps,
            user: data.user || null,
        };
    } catch (error) {
        return { pageProps: {}, user: null };
    }
};