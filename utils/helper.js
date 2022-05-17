const PAGE_SIZE = 20;
const PAGE_NO = 1;
exports.getPageNo = async (req) => {
    let pageNo = PAGE_NO;
    if (req.query && req.query.pageNo) {
        pageNo = parseInt(req.query.pageNo);
    }
    return pageNo;
}

exports.getPageSize = async (req) => {
    let pageSize = PAGE_SIZE;
    if (req.query && req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize);
    }
    return pageSize;
}

exports.getOrAnd = async (req) => {
    let orAnd = OR_AND;
    if (req.query && req.query.orAnd) {
        orAnd = req.query.orAnd;
    }
    return orAnd;
}

exports.extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}