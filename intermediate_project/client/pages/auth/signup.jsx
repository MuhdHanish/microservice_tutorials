export default function Signup() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="col-12 col-md-6 border mx-auto my-5 mb-5 p-5 shadow bg-body rounded d-flex flex-column gap-3">
                <h2>Signup</h2>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                <p className="text-center">Already have an account? <a href="/auth/signin">Signin</a></p>
            </form>
        </div>
    );
}