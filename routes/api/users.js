const express = require('express');
const controllerUsers = require('../../controllers/users-controllers');
const { createAccountLimiter } = require('../../helpers/reate-limit');
const router = express.Router();
const guard = require('../../helpers/guard');
const {
  validateSingup,
  validateLogin,
  validateSubscriptionUpdate,
  validateVerifyUser,
} = require('../../validation/users-validation');
const upload = require('../../helpers/multer');

router.patch(
  '/sub',
  guard,
  validateSubscriptionUpdate,
  controllerUsers.updateSubscription,
);
router.post(
  '/signup',
  validateSingup,
  createAccountLimiter,
  controllerUsers.signup,
);

router.post('/login', validateLogin, controllerUsers.login);

router.post('/logout', guard, controllerUsers.logout);

router.get('/current', guard, controllerUsers.current);
router.get('/verify/:verificationToken', controllerUsers.verify);
router.post('/verify', validateVerifyUser, controllerUsers.reVerification);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.uploadAvatar,
);

module.exports = router;