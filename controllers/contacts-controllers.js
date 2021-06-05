const { HttpCode } = require('../helpers/constants');
const { ContactsServices } = require('../services');

const contactsServices = new ContactsServices();

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs, ...rest } = await contactsServices.getAll(userId, req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts: [...docs],
        ...rest,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsServices.getById(userId, req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};
const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsServices.create(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  if (Object.values(req.body).length === 0) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'Missing fields',
      data: 'Missing fields',
    });
  }
  try {
    const userId = req.user.id;
    const contact = await contactsServices.update(userId, req.params, req.body);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsServices.remove(userId, req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact deleted',
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsServices.updateStatus(
      userId,
      req.params,
      req.body,
    );
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Contact not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  updateStatus,
};