const userSchema = require("../../models/userSchema");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name) return res.status(400).send({ message: "Name is required" });

    if (!email) return res.status(400).send({ message: "Email is required" });

    if (!password)
      return res.status(400).send({ message: "Password is required" });

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Create new user
    const user = await userSchema.create({
      name,
      email,
      password,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { signup };
