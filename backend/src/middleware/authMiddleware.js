import JWT from "jsonwebtoken";

//get bearer token

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log("token is", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, please login first",
      });
    }
    JWT.verify(token, process.env.secret, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "UnAuthorized User",
        });
      } else {
        req.user = { id: decode.id };
        console.log("User authenticated successfully");
        next();
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ message: error });
  }
};
