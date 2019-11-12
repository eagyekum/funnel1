const Joi = require("@hapi/joi");

const validator = data => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .min(6)
      .max(1000)
      .required()
  });

  return schema.validate(data);
};

module.exports = validator;
