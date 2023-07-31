import printer from '../utils/pdfmake';
import request from 'supertest';

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const generatePDFReport = (response, timeTaken: number) => {
  const docDefinition = {
    content: [
      { text: 'Received data: ', style: 'header' },
      // { text: JSON.stringify(response, null, 2) }, // Форматирование JSON с отступами (2 пробела)
      {
        table: {
          dontBreakRows: true,
          body: [
            [
              'description',
              'images',
              'colors',
              'aiDescription',
              'styleGuide',
              'socialMedia',
              'fonts',
              'domain',
              'websiteUrl',
              'facts',
              'history',
            ],
            [
              response.description,
              JSON.stringify(response.images, null, 2),
              JSON.stringify(response.colors),
              response.aiDescription,
              JSON.stringify(response.styleGuide, null, 6),
              JSON.stringify(response.socialMedia, null, 2),
              JSON.stringify(response.fonts),
              response.domain,
              response.websiteUrl,
              response.facts,
              response.history,
            ],
          ],
        },
      },
      {
        text: `Response time taken: ${Math.round(timeTaken / 1000)}`,
        style: { background: '#cfe1ff' },
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        margin: [0, 0, 0, 10], // Верхнее, правое, нижнее, левое поля
      },
    },
    pageSize: 'A2',
    pageOrientation: 'landscape',
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  const filePath = path.join(
    __dirname,
    'reports',
    'single-reports',
    `${Date.now()}-single-request-report.pdf`
  );

  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.end();
};

test('single-request/generate-brand-info', async () => {
  const start = performance.now();
  const response = await request(process.env.APP_DOMAIN)
    .put('/generate-brand-info')
    .send({ websiteUrl: 'https://brandfetch.com/' });
  const end = performance.now();
  expect(response.body).toHaveProperty('images');
  const timeTaken = end - start;
  generatePDFReport(response.body, timeTaken);
}, 200000);
