import request from "supertest";
import { app } from "../../app";

describe("signup", () => {
    it("returns a 400 with missing email and password", async () => {
        return request(app)
            .post("/api/auth/signup")
            .send({})
            .expect(400);
    });

    it("returns a 400 with an invalid email", async () => {
        return request(app)
            .post("/api/auth/signup")
            .send({
                email: "testtest.com",
                password: "Jhone@123",
            })
            .expect(400);
    });

    it("returns a 400 with an invalid password", async () => {
        return request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "J",
            })
            .expect(400);
    });

    it("returns a 400 with an invalid email and password", async () => {
        return request(app)
            .post("/api/auth/signup")
            .send({
                email: "testtest.com",
                password: "J",
            })
            .expect(400);
    });

    it("returns a 201 on successful signup", async () => {
        return request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(201);
    });

    it("returns a 409 with an existing email", async () => {
        await request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(201);
        await request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(409);
    });

    it("sets a cookie after successful signup", async () => {
        const response = await request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(201);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
})