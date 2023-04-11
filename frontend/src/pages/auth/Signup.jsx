import { useState } from 'react';
import MessageAlert from '../../components/MessageAlert';

import { useSignup } from '../../hooks/useSignup'

const Signup = () => {

    const { signup, error, isLoading, isSuccess } = useSignup()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeat_password, setRepeat_password] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(name, email, password, repeat_password)

    }

    if (isSuccess) {
        window.location.replace('/login')
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4 col-md-7 mx-auto">

                    <div className="p-3 mt-5 m-5 mb-5">
                        <h3 className="text-center fw-bold">Account Signup</h3>
                        <p className="text-center">Please complete the form to continue</p>

                        {
                            error && <MessageAlert msg={error} type={'error'} />
                        }

                        <form action="" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label className="mx-1 fw-bold">Full name</label>
                                    <input type="text" className="form-control" placeholder="full name" onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="col-lg-12 mb-2">
                                    <label className="mx-1 fw-bold">Email</label>
                                    <input type="email" className="form-control" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="col-lg-12 mb-2">
                                    <label className="mx-1 fw-bold">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="col-lg-12 mb-2">
                                    <label className="mx-1 fw-bold">Password Confirmation</label>
                                    <input type="password" className="form-control" placeholder="Password confirmation" onChange={(e) => setRepeat_password(e.target.value)} />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <button disabled={isLoading}
                                        className="btn btn-success text-white fw-bold w-100 d-flex align-items-center justify-content-center">
                                        <i className='bx bx-log-in mx-1'></i>
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;