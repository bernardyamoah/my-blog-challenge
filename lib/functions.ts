


export const formatTime = (timePosted: string) => {
	const postedDate = new Date(timePosted);
	const currentDate = new Date();

	const timeDiff = currentDate.getTime() - postedDate.getTime();
	const secondsDiff = Math.floor(timeDiff / 1000);
	const minutesDiff = Math.floor(secondsDiff / 60);
	const hoursDiff = Math.floor(minutesDiff / 60);
	const daysDiff = Math.floor(hoursDiff / 24);
	const monthsDiff = Math.floor(daysDiff / 30);
	const yearsDiff = Math.floor(monthsDiff / 12);

	if (yearsDiff > 0) {
		return `${yearsDiff} ${yearsDiff === 1 ? "year" : "years"} ago`;
	} else if (monthsDiff > 0) {
		return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"} ago`;
	} else if (daysDiff > 0) {
		return `${daysDiff} ${daysDiff === 1 ? "day" : "d"} ago`;
	} else if (hoursDiff > 0) {
		return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hrs"} ago`;
	} else if (minutesDiff > 0) {
		return `${minutesDiff} ${minutesDiff === 1 ? "min" : "mins"} ago`;
	} else {
		return `${secondsDiff} ${secondsDiff === 1 ? "sec" : "secs"} ago`;
	}
};

export const formatUserTime = (timePosted: string) => {
	return new Date(timePosted).toLocaleString("en-US", {
		dateStyle: "medium",
		// timeStyle: "short",

	});
};




 
 

