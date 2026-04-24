import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';

test('Post to create account, get details and delete account', async ({
  request,
  randomUser,
}) => {
  const name = randomUser.name;
  const email = randomUser.email;
  const response = await request.post('/api/createAccount', {
    form: {
      name: name,
      email: email,
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

  expect(responseBody.responseCode).toBe(201);
  expect(responseBody.message).toBe('User created!');

  const response2 = await request.get('/api/getUserDetailByEmail', {
    params: {
      email: email,
    },
  });

  const responseBody2 = await response2.json();
  expect(response2.status()).toBe(200);
  expect(responseBody2.responseCode).toBe(200);
  expect(responseBody2.user.email).toBe(email);
  expect(responseBody2.user.name).toBe(name);

  const response1 = await request.delete('/api/deleteAccount', {
    form: {
      email: email,
      password: 'userAPI',
    },
  });
  const responseBody1 = await response1.json();
  expect(response1.status()).toBe(200);
  expect(responseBody1.responseCode).toBe(200);
  expect(responseBody1.message).toBe('Account deleted!');
});
