import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { updateUser } from './endpoints';
import { User } from '../lib/interface';

interface UserEditFormProps {
    dialogRef: React.Ref<any>;
    closeDialog: () => void;
    setUser: (user: User) => void;
    setSuccessMessage: (message: string) => void;
    token: string;
}

const UserEditForm: React.FC<UserEditFormProps> = forwardRef(({
    closeDialog,
    setUser,
    setSuccessMessage,
    token,
}, ref) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        open: (user: User) => {
            setCurrentUser(user);
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
            });
            setVisible(true);
            dialogRef.current?.showModal();
        },
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        if (!currentUser) return;

        try {
            setLoading(true);
            const updatedUser = { ...currentUser, ...formData };
            await updateUser(currentUser, formData, token);

            setUser(updatedUser); // Actualiza un solo usuario
            setSuccessMessage('User updated successfully!');
            closeDialog();
            setVisible(false);
            dialogRef.current?.close();
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setVisible(false);
        dialogRef.current?.close();
    };

    return (
        <dialog ref={dialogRef} className="user-edit-dialog">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="dialog-actions">
                    <button type="button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </dialog>
    );
});

export default UserEditForm;
