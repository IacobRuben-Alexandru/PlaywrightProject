import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { ProductRequests } from './requests/ProductRequests';
test('Post to create account, update it and delete it', async ({
  request,
}) => {
  const Email = faker.internet.email();
  const Password = faker.internet.password();

  const api = new ProductRequests(request);
    
  const response = await api.postToCreateAccount(Email, Password);
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(201);
  expect(responseBody.message).toBe('User created!');

  const response2 = await api.putToUpdateAccountDetails(Email, Password);
  
  const responseBody2 = await response2.json();
  expect(response2.status()).toBe(200);
  expect(responseBody2.responseCode).toBe(200);
  expect(responseBody2.message).toBe('User updated!');

  const response1 = await api.deleteAccount(Email,Password);
  
  const responseBody1 = await response1.json();
  expect(response1.status()).toBe(200);
  expect(responseBody1.responseCode).toBe(200);
  expect(responseBody1.message).toBe('Account deleted!');
});
