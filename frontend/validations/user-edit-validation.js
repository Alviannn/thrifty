import Joi from "joi";

const isUsername = (value, helpers) => {
	for (let i = 0; i < value.length; i++) {
		if (
			(value[i] >= "a" && value[i] <= "z") ||
			(value[i] >= "0" && value[i] <= "9") ||
			value[i] === "." ||
			value[i] === "-" ||
			value[i] === "_"
		) {
			continue;
		} else {
			return helpers.message({ custom: "Invalid username format" });
		}
	}

	return true;
};

const userEditSchema = Joi.object({
	name: Joi.string().required().max(50).messages({
		"string.empty": "Name field is required",
		"string.max": "Name field should not contain more than 50 characters",
	}),
	phone: Joi.string()
		.required()
		.min(10)
		.max(15)
		.pattern(/^[0-9]+$/)
		.messages({
			"string.empty": "Phone field is required",
			"string.min": "Phone field should contain at least 10 numbers",
			"string.max": "Phone field should not contain more than 15 numbers",
			"string.pattern.base": "Phone can only contain numbers",
		}),
	email: Joi.string(),
	username: Joi.string().required().max(50).custom(isUsername).messages({
		"string.empty": "Username field is required",
		"string.max": "Username field should not contain more than 50 characters",
		"string.custom": "Invalid username format",
	}),
	address: Joi.string().allow(""),
	city: Joi.string().allow(""),
	country: Joi.string().allow(""),
	zipCode: Joi.number().allow("").messages({
		"number.base": "Zip code can only contain numbers",
	}),
});

export default userEditSchema;
