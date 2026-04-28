import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';
import { faker } from '@faker-js/faker'
import { ProductRequests } from './requests/ProductRequests';

test('Post to create account with existing email', async ({ request }) => {

  const api = new ProductRequests(request);
    
  const response = await api.postToCreateAccount(USERS.email, USERS.password);

  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toBe('Email already exists!');
});
