const { HttpCode } = require('../helpers/constants');
const { UsersServices, AuthServices } = require('../services');

const usersServices = new UsersServices();
const authServices = new AuthServices();

const signup = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersServices.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is already use',
    });
  }
  try {
    const newUser = await usersServices.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await authServices.login({ email, password });
    if (response) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          ...response,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await authServices.logout(id);
    return res.status(HttpCode.NO_CONTENT).json({
      status: 'success',
      code: HttpCode.NO_CONTENT,
    });
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const user = await authServices.current(userEmail);
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: user });
  } catch (e) {
    next(e);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedUser = await usersServices.updateSubscriptionById(
      userId,
      req.body,
    );

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (req.file) {
      const url = await usersServices.uploadAvatar(userId, req.file);

      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          avatarURL: url,
        },
      });
    } else {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      });
    }
  } catch (error) {
    next(error);
  }
};
const verify = async (req, res, next) => {
  try {
    const result = await usersServices.verify(req.params);
    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'User not found. Contact with administration',
      });
    }
  } catch (error) {
    next(error);
  }
};
const reVerification = async (req, res, next) => {
  try {
    const user = await usersServices.findByEmail(req.body.email);
    if (user.verify) {
      next({
        status: HttpCode.BAD_REQUEST,
        data: {
          message: 'Verification has already been passed',
        },
      });
    }

    const { name, email, verifyToken } = user;
    await usersServices.repeatSendMail({
      name,
      email,
      verifyToken,
    });

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        message: 'Verification email sent',
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  uploadAvatar,
  verify,
  reVerification,
};