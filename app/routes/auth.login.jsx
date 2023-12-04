export default function Login() {
  return (
    <>
      <div className="page-header">
        <h1>Log In</h1>
      </div>
      <form method="post">
        <div className="form-control">
          <label htmlFor="username">UserName</label>
          <input type="text" id="username" name="username" />
          <div className="error">
            <p></p>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
          <div className="error">
            <p></p>
          </div>
        </div>
        <button type="submit" className="btn btn-block">
          Login
        </button>
      </form>
    </>
  );
}
