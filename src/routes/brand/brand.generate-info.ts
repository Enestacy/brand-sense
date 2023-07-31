import express from 'express';
const router = express.Router();
import { JSDOM } from 'jsdom';
import { Request, Response } from 'express';
import {
  InvalidWebsiteDomain,
  NoWebsiteProvided,
  PutBrandBody,
  getBrandDataPrompt,
} from '../../utils';

router.put(
  '/generate-brand-info',
  async (req: Request<PutBrandBody>, res: Response) => {
    try {
      const websiteUrl = req.body?.websiteUrl;
      if (!websiteUrl) throw NoWebsiteProvided;

      const reqExp = /(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
      const execDomainName = websiteUrl.match(reqExp)[1];

      if (!execDomainName) throw InvalidWebsiteDomain;

      const websiteData = {
        images: [],
        description: '',
        colors: [],
        aiDescription: '',
        styleGuide: {},
        socialMedia: {},
        fonts: [],
        domain: execDomainName,
        websiteUrl,
        facts: '',
      };

      const prompt = getBrandDataPrompt(websiteUrl);

      const resp = await req.context.openaiClient?.createChatCompletion({
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
        model: 'gpt-4',
        temperature: 0,
        n: 1,
        max_tokens: 3500,
      });

      const result = resp.data.choices[0].message.content.trim();

      const parsedData = JSON.parse(result);

      const parseSite = await fetch(websiteUrl);
      const html = await parseSite.text();

      const dom = new JSDOM(html);
      const document = dom.window.document;

      const metaTags = document.querySelectorAll('meta');

      metaTags.forEach((metaTag) => {
        const name = metaTag.getAttribute('name');
        const content = metaTag.getAttribute('content');
        if (!!name && (name.includes('image') || name.includes('logo'))) {
          websiteData.images.push({
            link: content,
            type: 'image',
            format: '',
          });
        }
        if (!!content && content.includes('.png')) {
          websiteData.images.push({
            link: content,
            type: 'image',
            format: '',
          });
        }
        if (name === 'description') {
          websiteData.description = content;
        }
      });

      const imagesLink = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
      );

      imagesLink.forEach((metaTag) => {
        const type = metaTag.getAttribute('rel');
        const format = metaTag.getAttribute('type');
        const link = metaTag.getAttribute('href');

        websiteData.images.push({ type, format, link });
      });

      const finalData = { ...websiteData, ...parsedData };

      res.send(finalData);
    } catch (error) {
      return res.status(error?.code || 500).send(error.message);
    }
  }
);

module.exports = router;
