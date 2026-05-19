import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from '../api/requests/ProductRequests';
import { USERS } from '../../config/constants';
import { automationexercise } from '../../pages/AutomationPage';
import { faker } from '@faker-js/faker';
import { ReachLoginPage } from '../../pages/LoginPage';


test('Post to verify valid login', async ({ request, page}) => {
    const Email = faker.internet.email();
    const Password = faker.internet.password();
    const Name = faker.person.fullName();
    const automationPage = new automationexercise(page);
    const loginPage = new ReachLoginPage(page);

    const api = new ProductRequests(request);
        
    const response = await api.postToCreateAccountName(Email, Password, Name);

    await api.deleteAccount(Email,Password)

    await loginPage.launchAndConsent();
    await loginPage.login(Email, Password);
    await expect(
      page.getByText('Your email or password is incorrect!'),
    ).toBeVisible();
});
