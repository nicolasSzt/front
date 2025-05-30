import { useState } from 'react';
import { loginAuth } from '../../services/authServices';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const onSubmit = async () => {
        try {
            setLoading(true)
            const res = await loginAuth({
                email: form_state[LOGIN_FIELD_NAME.EMAIL],
                password: form_state[LOGIN_FIELD_NAME.PASSWORD]
            })
            if (res.ok) {
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                    res.data.authorization_token
                )
                navigate('/home')
            }
            else {
                setError(res.message)
            }
        }
        catch (error) {
            setError('Ocurrio un error al comunicarnos con el servidor (intentalo mas tarde)')
        }
        finally {
            setLoading(false)
        }
    }

    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit, initial_form_state: {
            [LOGIN_FIELD_NAME.EMAIL]: '',
            [LOGIN_FIELD_NAME.PASSWORD]: ''
        }
    })


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