export const getBrandDataPrompt = (websiteUrl: string): string => {
  const prompt = `You are given a website’s entire content without any formatting, ignore extraneous text
like ‘home’, ‘login’, and ‘contact’ etc. Focus on the main content of the website
at ‘${websiteUrl}’. You main goal is to collect and summarize all data you have about provided brand.

Point 1. Analyze the main products, services, and features offered.
Provide detailed descriptions of the key offerings, their purposes, and benefits.
Concentrate on the most important aspects relevant to potential customers and users of this website. Use language that a 12-year-old would understand. Additionally, mention any unique selling points or competitive advantages that set this website or company apart from others in the same industry.  Tell about brand voice and tone. Write a comprehensive and concise summary, not exceeding 100 words.
Point 2. Analyze design and brand. Return hex codes of primary brand colors.
Point 3. Return links to the social media assosiated with this company.
Point 4. Generate style guide recommendations. Focus on style preferences and recommendation. Do not use general recommendation (such as create a professional illustration, use brand colors etc). Give detailed and accurate advice for designers. Suggest some helpful features based on company's style preferences. The text should include the following sections: 
Brand Style Overview: brand style preferences and principles, style direction, specific visual elements;
Logo Guidelines: describe logo, proportions and provide link if available;
Color Palette: describe primary and secondary colors. Make sure inforfation corresponds with data of point 2;
Typography: name of fonts that brand is using and couple of words about these fonts;
Do’s and Don’ts: some unique recommendation for this particular brand;
Resources: provide and least 3 links to resources to help designers find more information about company style (such as branbook, guidelines, articles etc).
Point 5. Intresting facts: provide some interesting facts about brand/company (3-5 facts). Format text like this: "1. fact 1 /n 2. fact 2 ... "
Point 6. History of brend/company, founders, achievements etc. (no more than 150 words)

You must reply in the following format: 
{
"aiDescription": text of point 1,
"colors": data of point 2 in array of hex codes format,
"socialMedia": data of point 3 in following format: {"socialMediaName": link to the brand account on this social media},
"styleGuide": data of point 4,
"fonts": array of fonts name based on text from your styleGuide,
"facts": data of point 5,
"history": data of point 6
}
}`;
  return prompt;
};
