import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';
test('Post to create account with existing email', async ({ request }) => {
  const response = await request.post('/api/createAccount', {
    form: {
      name: 'userAPI',
      email: USERS.email1,
      password: 'userAPI',
      title: 'Mr',
      birth_date: '2004-12-29',
      birth_month: '12',
      birth_year: '2004',
      firstname: 'userAPI',
      lastname: 'userAPI',
      company: 'userAPI',
      address1: 'userAPI',
      address2: 'userAPI',
      country: 'United States',
      zipcode: '33101',
      state: 'Florida',
      city: 'Miami',
      mobile_number: '3051234567',
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toBe('Email already exists!');
});
