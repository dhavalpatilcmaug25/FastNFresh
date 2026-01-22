import jwt from "jsonwebtoken";

export function verifyToken(request, response, next) {
  const authHeader = request.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
      if (error) {
        response.status(401).send({ message: "Token is invalid" });
      } else {
        console.log("Token payload:", payload);

        request.loggedInUserId =
          payload.userId || payload.id || payload.user_id;
        console.log("Resolved user ID:", request.loggedInUserId);
        request.role = payload.role;
        next();
      }
    });
  } else {
    response.status(401).send({ message: "Token is missing" });
  }
}

export function authorize(allowedRoles) {
  return (request, response, next) => {
    if (allowedRoles.includes(request.role)) {
      next();
    } else {
      response.status(403).send({ message: "Access denied" });
    }
  };
}
