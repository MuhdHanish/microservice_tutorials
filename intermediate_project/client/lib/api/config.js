import axios from "axios";

export const axiosInstace = ({ req }) => {
    const isServer = typeof window === "undefined";
    return isServer
        ? axios.create({
            baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
            headers: req.headers
        })
        : axios.create({
            baseURL: "/"
        });
}