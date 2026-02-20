const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.register,
);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
