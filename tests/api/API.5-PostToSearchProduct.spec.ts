import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";

test("Post to search product", async ({request})=>{
    const response = await request.post('/api/searchProduct', {
        form: {
            search_product: "top",
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBe(true);
    for(const product of responseBody.products) {
        expect(product).toHaveProperty('brand');
        expect(product).toHaveProperty('name');
    }
});