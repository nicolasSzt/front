import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerAuth } from "../../services/authServices";
import { REGISTER_FIELD_NAME } from "../../constans/form/register";
import useForm from "../../hooks/useForm";

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const onSubmit = async () => {
        console.log('form_state', form_state);
        try {
            setLoading(true);
            const res = await registerAuth({
                name: form_state[REGISTER_FIELD_NAME.NAME],
                email: form_state[REGISTER_FIELD_NAME.EMAIL],
                password: form_state[REGISTER_FIELD_NAME.PASSWORD]
            });
            console.log(res.ok)
            if (res.ok) {
                navigate('/login');
            }
        } catch (error) {
            setError('Ocurrió un error al comunicarnos con el servidor (inténtalo más tarde)');
        } finally {
            setLoading(false);
        }
    };

    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit,
        initial_form_state: {
            [REGISTER_FIELD_NAME.NAME]: '',
            [REGISTER_FIELD_NAME.EMAIL]: '',
            [REGISTER_FIELD_NAME.PASSWORD]: ''
        }
    });

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
                            name={REGISTER_FIELD_NAME.NAME}
                            type='text'
                            value={form_state[REGISTER_FIELD_NAME.NAME]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name={REGISTER_FIELD_NAME.EMAIL}
                            type='email'
                            value={form_state[REGISTER_FIELD_NAME.EMAIL]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name={REGISTER_FIELD_NAME.PASSWORD}
                            type='password'
                            value={form_state[REGISTER_FIELD_NAME.PASSWORD]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;