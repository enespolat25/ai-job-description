const generateDescription = async ({
	jobTitle,
	industry,
	keyWords,
	tone,
	numWords,
  }) => {
	try {
	  const response = await fetch(
		"https://api.openai.com/v1/engines/text-davinci-003/completions",
		{
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		  },
		  body: JSON.stringify({
			prompt: ` ${jobTitle} rolü için bir iş tanımı yaz
			${industry ? `alanında ${industry} endüstrisinde` : ""} that is around ${
			  numWords || 200
			} kelime ile ${tone || "neutral"} tone. ${
			  keyWords ? `bahsedeceğim kelimeleri içeren: ${keyWords}.` : ""
			}. İş pozisyonu, benzersiz özelliklerini ve faydalarını vurgulayarak SEO dostu bir şekilde tanımlanmalıdır.`,
			max_tokens: 1000,
			temperature: 0.5,
		  }),
		}
	  );
	  const data = await response.json();
  
	  return data.choices[0].text;
	} catch (err) {
	  console.error(err);
	}
  };
  
  export default async function handler(req, res) {
	const { jobTitle, industry, keyWords, tone, numWords } = req.body;
  
	const jobDescription = await generateDescription({
	  jobTitle,
	  industry,
	  keyWords,
	  tone,
	  numWords,
	});
  
	res.status(200).json({
	  jobDescription,
	});
  }