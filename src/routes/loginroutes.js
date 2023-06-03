const express = require("express");

const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/logincontroller");
const { dashboardView } = require("../controllers/dashboardcontroller");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/register", registerView);
router.get("/login", loginView);
//Dashboard
router.get("/dashboard", protectRoute, dashboardView);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;