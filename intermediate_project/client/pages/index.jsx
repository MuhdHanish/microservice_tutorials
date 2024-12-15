import Link from "next/link";
import { useRequest } from "../hooks";
import { axiosInstace } from "../lib/api/config";

Home.getInitialProps = async (context, user) => {
    try {
        const { data } = await axiosInstace(context.ctx).get("/api/tickets");
        return {
            tickets: data.tickets || [],
            user
        };
    } catch (error) {
        return {
            tickets: [],
            user,
        }
    }
};

export default function Home({ tickets }) {
    return (
        <div className="container d-flex flex-column py-5">
            <h3 className="fw-bold text-uppercase">Tickets</h3>
            <hr />
            <div className="d-flex flex-row flex-wrap gap-3">
                {
                    tickets?.map((ticket, index) => (
                        <div className="card col-12 col-lg-3" key={`${ticket?.id}-${index}`}>
                            <div className="card-body">
                                <h3 className="card-title fw-bold">{ticket?.title}</h3>
                                <p className="card-text fs-4 fw-bold">₹{ticket?.price}</p>
                                <Link href={`/tickets/${ticket?.id}`} className="text-primary text-decoration-none text-uppercase h6">View</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}