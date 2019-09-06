module.exports = {
	policy: [
		{
			userAgent: "Googlebot",
			allow: "/",
			disallow: ["/dashboard"],
			crawlDelay: 2
		},
		{
			userAgent: "*",
			allow: "/",
			disallow: "/dashboard",
			crawlDelay: 10,
		}
	],
	host: process.env.ROBOTS_HOST
};