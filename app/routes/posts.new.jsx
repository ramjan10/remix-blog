import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "../db.server";

//validate function

const validateTitle = (title) => {
  if (typeof title !== "string" || title.length < 3) {
    return "title should be string and length should be more then 3";
  }
};

const validatebody = (body) => {
  if (typeof body !== "string" || body.length < 10) {
    return "body should be string and length should be more then 10";
  }
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const userId = "1";
  const fields = { title, body, userId };

  const fieldErrors = {
    title: validateTitle(title),
    body: validatebody(body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const post = await db.post.create({ data: fields });

  return redirect("/posts");
};

function NewPost() {
  const actionData = useActionData();
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
      </div>

      <form method="post">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={actionData ? actionData.fields.title : ""}
          />
          <div className="error">
            <p>{actionData ? actionData.fieldErrors.title : ""}</p>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="body">Post Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={actionData ? actionData.fields.body : ""}
          ></textarea>
          <div className="error">
            <p>{actionData ? actionData.fieldErrors.body : ""}</p>
          </div>
        </div>
        <button type="submit" className="btn btn-block">
          Add Post
        </button>
      </form>
    </>
  );
}

export default NewPost;
