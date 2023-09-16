module.exports = {
	token: process.env.token || "",
	CLIENT_ID: process.env.CLIENT_ID || "",
	prefix: process.env.prefix || "",
  
	time: {
	  status: 1,
	  activities: 1,
	  roulette: 30
	},
	messages: {    COOLDOWN_MESSAGE:"You are on `<duration>` cooldown!"
	},
  

	db: {
		status: false, // if you need to use mysql db set true
		ip: "",// host ip
		hn: "",// db user name
		dp: "",// db passord
		dn: ""// db name
	  }
  };
  