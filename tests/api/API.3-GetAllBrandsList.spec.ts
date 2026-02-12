import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";

test("Get all brands list", async ({request})=>{
    const response = await request.get('/api/brandsList');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBe(true);
    for(const brand of responseBody.brands) {
        expect(brand).toHaveProperty('id');
        expect(brand).toHaveProperty('brand');
    }

});