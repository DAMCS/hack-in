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
	host: process.env.REACT_APP_ROBOTS_HOST
};