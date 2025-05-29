import { useState } from 'react';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => (
            { ...prevForm, [name]: value }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registro fallido');
                return;
            }
            setError('');
            console.log(data);
        } catch {
            setError('Error en el registro');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            background: '#f5f5f5',
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
                <h1>Registrarse</h1>
                <form autoComplete="off"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        width: '100%'
                    }} onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label htmlFor='name'>Nombre</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage