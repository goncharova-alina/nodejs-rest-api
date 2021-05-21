const { HttpCode } = require("../helpers/constants");
const { ContactsServices } = require("../services");

const contactsServices = new ContactsServices();

const getAll = (_req, res, next) => {
  try {
    const contacts = contactsServices.getAll();
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getById = (req, res, next) => {
  try {
    const contact = contactsServices.getById(req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};
const create = (req, res, next) => {
  try {
    const contact = contactsServices.create(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = (req, res, next) => {
  try {
    const contact = contactsServices.update(req.params, req.body);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};
const remove = (req, res, next) => {
  try {
    const contact = contactsServices.remove(req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "contact deleted",
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
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
};
