const _ = require("lodash");
const {StatusCodes} = require('http-status-codes');

function bodyValidator(model) {
    return (req, res, next) => {
        try {
            const bodyParams = req.body;
            if( _.isEmpty(model) || _.isEmpty(bodyParams)){
                return res.status(StatusCodes.BAD_REQUEST).send("Bad Request");
            }

            let missingKeys = [];
            let wrongType = [];
            for (const key in model) {
                const field = model[key];
                if (field.required && !bodyParams[key]) {
                    missingKeys.push(key);
                } else if (field.required && typeof bodyParams[key] !== field.type) {
                    wrongType.push(key);
                }
            }

            if(!_.isEmpty(missingKeys)){
                return res.status(StatusCodes.BAD_REQUEST).send(`Bad Request : Missing keys - ${missingKeys.join(",")}`);
            } else if (!_.isEmpty(wrongType)) {
                return res.status(StatusCodes.BAD_REQUEST).send(`Bad Request : Wrong datatype for - ${wrongType.join(",")}`);
            } else {
                next();
            }
        } catch (e) {
            next(e);
        }
    };
}


module.exports = bodyValidator;