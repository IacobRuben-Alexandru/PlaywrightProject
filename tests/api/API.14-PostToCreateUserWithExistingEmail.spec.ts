import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';
import { faker } from '@faker-js/faker'

test('Post to create account with existing email', async ({ request }) => {
  const Password = faker.internet.password().toString();
  const Birth_date = faker.date.birthdate();
  const Name = faker.person.fullName();
  const response = await request.post('/api/createAccount', {
    form: {
      name: Name,
      email: USERS.email1,
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

  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toBe('Email already exists!');
});
