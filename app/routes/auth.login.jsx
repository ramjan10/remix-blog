import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { login } from "../session.server";

//validate function
const validateUserName = (userName) => {
  if (typeof userName !== "string" || userName.length < 3) {
    return "userName should be string and length should be more then 3";
  }
};

const validatePassword = (password) => {
  if (typeof password !== "string" || password.length < 4) {
    return "password should be string and length should be more then 4";
  }
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const userName = form.get("username");
  const password = form.get("password");

  const fields = { userName, password };

  const fieldErrors = {
    userName: validateUserName(userName),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const user = await login({ userName, password });

  if (!user) {
    return json({
      fieldErrors: { userName: "Invalid credentials" },
      fields,
    });
  }

  return redirect("/posts");
};

export default function Login() {
  const actionData = useActionData();
  return (
    <>
      <div className="page-header">
        <h1>Log In</h1>
      </div>
      <form method="post">
        <div className="form-control">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={
              actionData?.fields?.userName && actionData?.fields?.userName
            }
          />
          <div className="error">
            <p>
              {actionData?.fieldErrors?.userName &&
                actionData?.fieldErrors?.userName}
            </p>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
          <div className="error">
            <p>
              {actionData?.fieldErrors?.password &&
                actionData?.fieldErrors?.password}
            </p>
          </div>
        </div>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </>
  );
}
