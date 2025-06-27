import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LOCALSTORAGE_KEYS from '../../constans/localStorage.js';
import useForm from '../../hooks/useForm.jsx';
import { LOGIN_FIELD_NAME } from '../../constans/form/login.js';
import { loginAuth } from '../../services/authServices.js';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            setLoading(true)
            const res = await loginAuth({
                [LOGIN_FIELD_NAME.EMAIL]: form_state.email,
                [LOGIN_FIELD_NAME.PASSWORD]: form_state.password
            })
            if (res.ok) {
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                    res.data.authorization_token
                )
                console.log('res', res.data.authorization_token)
                navigate('/workspacesSelector')
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
                            value={form_state.email}
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
                            value={form_state.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>                </form>
            </div>
        </div>
    );
};

export default Login;