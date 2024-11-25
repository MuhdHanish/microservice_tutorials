import request from "supertest";
import { app } from "../../app";

describe("signin", () => {
    it("returns a 400 with missing email and password", async () => {
        return request(app)
            .post("/api/auth/signin")
            .send({})
            .expect(400);
    });

    it("returns a 400 with an invalid email", async () => {
        return request(app)
            .post("/api/auth/signin")
            .send({
                email: "testtest.com",
                password: "Jhone@123",
            })
            .expect(400);
    });

    it("returns a 400 with an invalid password", async () => {
        return request(app)
            .post("/api/auth/signin")
            .send({
                email: "jhondoe@example.com",
                password: "J",
            })
            .expect(400);
    });

    it("returns a 400 with an invalid email and password", async () => {
        return request(app)
            .post("/api/auth/signin")
            .send({
                email: "testtest.com",
                password: "J",
            })
            .expect(400);
    });

    it("returns a 401 with an invalid credentials", async () => {
        await request(app)
            .post("/api/auth/signin")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(401);
    });

    it("returns a 200 on successful signin", async () => {
        await request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(201);
        await request(app)
            .post("/api/auth/signin")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(200);
    });

    it("sets a cookie after successful signin", async () => {
        await request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(201);
        const response = await request(app)
            .post("/api/auth/signin")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(200);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});