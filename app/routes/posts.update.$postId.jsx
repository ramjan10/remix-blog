import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
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

export const loader = async ({ params }) => {
  const id = parseInt(params.postId);
  const post = await db.post.findUnique({
    where: { id: id },
  });

  if (!post) throw new Error("post not found");
  return post;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

  const fields = { title, body };

  const fieldErrors = {
    title: validateTitle(title),
    body: validatebody(body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 404 });
  }

  const post = db.post.update({ data: fields });

  return redirect("/posts");
};

export default function PostUpdate() {
  const post = useLoaderData();
  const actionData = useActionData();

  return (
    <>
      <div className="page-header">
        <h1>Post update</h1>
      </div>

      <form method="post">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post?.title}
          />
          <div className="error">
            <p>{actionData ? actionData.fieldErrors.title : ""}</p>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="body">Post Body</label>
          <textarea name="body" id="body" defaultValue={post?.body}></textarea>
          <div className="error">
            <p>{actionData ? actionData.fieldErrors.body : ""}</p>
          </div>
        </div>
        <button type="submit" className="btn btn-block">
          Update Post
        </button>
      </form>
    </>
  );
}
