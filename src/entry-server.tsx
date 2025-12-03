import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { ServerStyleSheet } from 'styled-components';
import { createRouter } from './router';

export async function render(url: string) {
  const router = createRouter();
  const sheet = new ServerStyleSheet();

  const memoryHistory = createMemoryHistory({
    initialEntries: [url],
  });

  router.update({
    history: memoryHistory,
  });

  await router.load();

  try {
    const html = renderToString(
      sheet.collectStyles(
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>,
      ),
    );
    const styleTags = sheet.getStyleTags();

    return { html, styleTags };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    sheet.seal();
  }
}
