import Usuario, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models';

// List all users
export async function index(req, res) {
    try {
        const usuarios = await find();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Show a single user
export async function show(req, res) {
    try {
        const usuario = await findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create a new user
export function create(req, res) {
    res.status(200).json({ message: 'Formulario de creación de usuario' });
}

// Store a new user
export async function store(req, res) {
    const usuario = new Usuario(req.body);
    try {
        const newUsuario = await usuario.save();
        res.status(201).json(newUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Edit a user
export async function edit(req, res) {
    try {
        const usuario = await findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update a user
export async function update(req, res) {
    try {
        const usuario = await findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete a user
export async function destroy(req, res) {
    try {
        const usuario = await findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}