// import { comparePassword, createJWT, hashPassword } from "../modules/auth";

// export const createNewUser = async (req, res) => {
//   const User = await prisma.user.create({
//     data: {
//       username: req.body.username,
//       password: await hashPassword(req.body.password),
//     },
//   });
//   const token = createJWT(User);
//   res.json({ token });
// };

// export const signIn = async (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.status(400).json({ message: "Invalid credentials" });
//     return;
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       username: req.body.username,
//     },
//   });
//   if (!user) {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
//   const isPasswordValid = await comparePassword(
//     req.body.password,
//     user.password
//   );
//   if (!isPasswordValid) {
//     res.status(401).json({ message: "Invalid credentials" });
//     return;
//   }

//   const token = createJWT(user);
//   res.json({ token });
// };
