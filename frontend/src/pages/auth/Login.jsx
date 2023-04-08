import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Error from "../../components/Error";
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4 col-md-7 mx-auto mt-5">

                    <div className="p-3 mt-5 m-5 mb-5">
                        <h3 className="text-center fw-bold">Account Login</h3>
                        <p className="text-center">Please complete the form to continue</p>

                        <form action="" onSubmit={handleSubmit}>

                            {
                                error && <Error msg={error} />
                            }

                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label className="mx-1 fw-bold">Email</label>
                                    <input type="email" className="form-control" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="mx-1 fw-bold">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <button className="btn btn-alt-dark text-white fw-bold w-100 d-flex align-items-center justify-content-center">
                                        <i className='bx bx-log-in mx-1'></i>
                                        Log in
                                    </button>
                                </div>
                                <div className="col-lg-12 text-center">
                                    <span >Forgot password | <a href="#">click here</a></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;