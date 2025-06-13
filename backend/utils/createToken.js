const jwt = require("jsonwebtoken");

function createToken(user = {}) {
    
    const payload = {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            phone: user.phone,
            email: user.email,
            status: user.status,
            role: user.role,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            services: user.services || [],
            requests: user.requests || [],
        },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = createToken;