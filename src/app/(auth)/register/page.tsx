import Form from 'next/form';

export default function Register() {
    return (
        <div className="min-h-screen">
            <Form>
                <input type="text" required/>
                <input type="password" required/>
                <button type="submit">Register</button>
            </Form>
        </div>
    )
}