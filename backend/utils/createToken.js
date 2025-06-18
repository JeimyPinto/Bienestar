const jwt = require("jsonwebtoken");

function toUtf8(str) {
    return typeof str === "string" ? Buffer.from(str, "utf8").toString() : str;
}

function createToken(user = {}) {
    const payload = {
        user: {
            id: user.id,
            firstName: toUtf8(user.firstName),
            lastName: toUtf8(user.lastName),
            documentType: toUtf8(user.documentType),
            documentNumber: toUtf8(user.documentNumber),
            phone: toUtf8(user.phone),
            email: toUtf8(user.email),
            status: toUtf8(user.status),
            role: toUtf8(user.role),
            image: toUtf8(user.image),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            services: user.services || [],
            requests: user.requests || [],
        },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = createToken;