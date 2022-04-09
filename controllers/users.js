const _ = require('lodash');
const {StatusCodes} = require('http-status-codes');
const userModel = require("../models/user");
const {getPageNo, getPageSize} = require('../utils/helper');

exports.getAll = async (req, res, next) => {
	try {
		const pageNo = await getPageNo(req);
		const pageSize = await getPageSize(req);
		const offset = (pageNo - 1) * pageSize;
		const totalCount = await userModel.count();
		const user = await userModel.find(offset, pageSize);
		if (!_.isEmpty(user)) {
			const result = {
				pageNo: pageNo,
				pageSize: pageSize,
				totalCount: totalCount,
				records: user,
			};
			res.status(StatusCodes.OK).send(result);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "Not found."});
		}
	} catch (e) {
		console.log(`Error in getAll`, e);
		next(e);
	}
};

exports.getById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userModel.findById(id);
		if (!_.isEmpty(user)) {
			res.status(StatusCodes.OK).send(user[0]);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "Not found."});
		}
	} catch (e) {
		console.log(`Error in getById`, e);
		next(e);
	}
};

exports.create = async (req, res, next) => {
	try {
		const user = await userModel.insert(req.body);
		if (!_.isEmpty(user)) {
			res.status(StatusCodes.CREATED).send(user[0]);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "Not found."});
		}
	} catch (e) {
		console.log(`Error in create`, e);
		next(e);
	}
};

exports.update = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userModel.update(id, req.body);
		if (!_.isEmpty(user)) {
			res.status(StatusCodes.OK).send(user[0]);
		} else {
			res.status(StatusCodes.BAD_REQUEST).send({message : "Bad request."});
		}
	} catch (e) {
		console.log(`Error in update`, e);
		next(e);
	}
};

exports.remove = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userModel.remove(id);
		if (user) {
			res.status(StatusCodes.OK).send({message : "Resource deleted"});
		} else {
			res.status(StatusCodes.BAD_REQUEST).send({message : "Bad request."});
		}
	} catch (e) {
		console.log(`Error in remove`, e);
		next(e);
	}
};
