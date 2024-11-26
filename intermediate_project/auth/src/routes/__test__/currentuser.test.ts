import request from "supertest";
import { app } from "../../app";

describe("currentuser", () => { 
    it("returns a 4XX if no token is provided or invalid", async () => { 
        const response = await request(app)
            .get("/api/auth/currentuser")
            .send({});
        const status = response.status;
        expect(status?.toString().startsWith('4')).toBe(true);
    });
    
    it("return a 200 and user if token is provided and valid", async () => {
        const response = await request(app)
            .post("/api/auth/signup")
            .send({
                email: "jhondoe@example.com",
                password: "Jhone@123",
            })
            .expect(201);
        const cookie = response.get("Set-Cookie") as string[];
        expect(cookie).toBeDefined();
        const response2 = await request(app)
            .get("/api/auth/currentuser")
            .set("Cookie", cookie)
            .send({});
        expect(response2.status).toBe(200);
        expect(response2.body.user).toBeDefined();
        expect(response2.body.user).toHaveProperty("id");
        expect(response2.body.user).toHaveProperty("email");
    });
});