const fs = require('fs');
const path = require('path');

//Función que procesa los usuarios y les asigna la URL de la imagen
function processUsers(users, req) {
    return users.map((user) => {
        const userData = user.toJSON();
        try {
            const filePath = path.join(
                __dirname,
                "..",
                "uploads",
                "temp",
                userData.image
            );

            if (userData.image && fs.existsSync(filePath)) {
                userData.image = `${req.protocol}://${req.get(
                    "host"
                )}/uploads/temp/${userData.image}`;
            } else {
                userData.image = null;
            }
        } catch (err) {
            console.error(
                "Error al leer el archivo / Error reading file:",
                err.message
            );
        }
        return userData;
    });
}

module.exports = {processUsers};