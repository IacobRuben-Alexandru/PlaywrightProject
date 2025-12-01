import { test as base} from "@playwright/test";
import { generateRandomEmail, generateRandomPassword } from "../utils/helpers";

export const test = base.extend<{
  randomUser: { email: string; password: string };
}>({
  randomUser: async ({}, use) => {
    const user = {
      email: generateRandomEmail(),
      password: generateRandomPassword(),
    };
    await use(user);
  },
});
