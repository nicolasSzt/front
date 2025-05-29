import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAuth } from '../../services/authService';
import LOCALSTORAGE_KEYS from '../../constans/token';

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => (
            { ...prevForm, [name]: value }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginAuth(form.email, form.password);
            localStorage.setItem(
                LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                data.authorization_token
            );
            console.log(data)
            navigate('/home');
        } catch (err) {

            setError("Error al iniciar sesión vuelva a intentarlo");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            background: '#f5f5f5'
        }}>
            <div style={{
                background: '#fff',
                padding: 32,
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                minWidth: 320,
                width: '100%',
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1>Iniciar sesión</h1>
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        width: '100%'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type='submit'>Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage