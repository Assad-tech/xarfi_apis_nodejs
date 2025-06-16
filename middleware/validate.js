const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const cleanMessage = error.details[0].message.replace(/["]/g, "");
      // console.log("hello");
      return res.status(400).json({ message: cleanMessage });
    }

    next();
  };
}

export default validate;
 