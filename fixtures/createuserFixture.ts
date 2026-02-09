import { test as base } from "@playwright/test";
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

  page: async ({ page }, use) => {
    await page.route('**/*.{google-analytics.com,googletagservices.com,googleadservices.com,ads.google.com,adservice.google.com,doubleclick.net}/**', 
        route => route.abort()
    );

    await page.route('**/*google_vignette*', route => route.abort());

    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        iframe, 
        ins.adsbygoogle, 
        .fc-consent-root, 
        .fc-dialog-container,
        div[id*="google_ads_iframe"],
        #google_vignette_container { 
          display: none !important; 
          visibility: hidden !important;
          pointer-events: none !important;
        }
        body { overflow: auto !important; } /* Reclamele blochează uneori scroll-ul */
      `;
      document.head.appendChild(style);
    });

    page.on('framenavigated', async (frame) => {
        if (frame === page.mainFrame() && page.url().includes('#google_vignette')) {
            const cleanUrl = page.url().split('#')[0];
            await page.goto(cleanUrl).catch(() => {}); 
        }
    });

    await use(page);
  }
});