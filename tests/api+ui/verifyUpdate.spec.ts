import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { ProductRequests } from '../api/requests/ProductRequests';
import { ReachLoginPage } from '../../pages/LoginPage';

test('Post to create account, update it and delete it', async ({
  request, page,
}) => {
    const Email = faker.internet.email();
    const Password = faker.internet.password();
    const Name = faker.person.fullName();

    const loginPage = new ReachLoginPage(page);

    const api = new ProductRequests(request);
        
    const response = await api.postToCreateAccount(Email, Password);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe('User created!');

    const response2 = await api.putToUpdateAccountDetailsName(Email, Password, Name);
    
    const responseBody2 = await response2.json();
    expect(response2.status()).toBe(200);
    expect(responseBody2.responseCode).toBe(200);
    expect(responseBody2.message).toBe('User updated!');

    await loginPage.launchAndConsent();
    await loginPage.login(Email, Password);
    await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();

    const response1 = await api.deleteAccount(Email,Password);
    
    const responseBody1 = await response1.json();
    expect(response1.status()).toBe(200);
    expect(responseBody1.responseCode).toBe(200);
    expect(responseBody1.message).toBe('Account deleted!');
});
