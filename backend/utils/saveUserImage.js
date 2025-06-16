// Utilidad para guardar el nombre de la imagen en el modelo User
// user: instancia del modelo User
// file: req.file
module.exports = async function saveUserImage(user, file) {
  if (file && file.filename) {
    user.image = file.filename;
    await user.update({ image: user.image });
  }
};
