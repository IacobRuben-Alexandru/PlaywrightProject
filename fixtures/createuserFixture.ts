import { test as base} from "@playwright/test";
import { generateRandomEmail, generateRandomPassword } from "../utils/helpers";

export const test = base.extend<{
  randomUser: { name: string; email: string };
}>({
  randomUser: async ({}, use) => {
    const user = {
      name: generateRandomPassword(),
      email: generateRandomEmail(),
    };
    await use(user);
  },
});
