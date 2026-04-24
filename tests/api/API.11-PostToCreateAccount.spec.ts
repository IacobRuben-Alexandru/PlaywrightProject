import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test('Post to create account and delete it', async ({
  request,
}) => {
  const Email = faker.internet.email();
  const Password = faker.internet.password();
  const Birth_date = faker.date.birthdate();
  const Name = faker.person.fullName();
  const response = await request.post('/api/createAccount', {
    form: {
      name: Name,
      email: Email,
      password: Password,
      title: 'Mr',
      birth_date: Birth_date.getDate(),
      birth_month: Birth_date.getMonth(),
      birth_year: Birth_date.getFullYear(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: faker.location.country(),
      zipcode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number(),
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(201);
  expect(responseBody.message).toBe('User created!');
  const response1 = await request.delete('/api/deleteAccount', {
    form: {
      email: Email,
      password: Password,
    },
  });
  const responseBody1 = await response1.json();
  expect(response1.status()).toBe(200);
  expect(responseBody1.responseCode).toBe(200);
  expect(responseBody1.message).toBe('Account deleted!');
});
