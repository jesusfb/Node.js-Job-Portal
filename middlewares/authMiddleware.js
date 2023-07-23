import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication Failed" });
  }
  const token = authHeader.split(" ")[1]; // Split using space as the separator
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication Failed" });
  }
};

export default userAuth;
