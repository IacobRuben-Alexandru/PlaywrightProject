import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";

test("Post to verify invalid login", async ({request,randomUser})=>{
    const response = await request.post('/api/verifyLogin', {
        form: {
            email: randomUser.email,
            password: randomUser.name,
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User not found!');
});