import { redirect } from "@remix-run/node";
import { db } from "../db.server";

function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
      </div>

      <form method="post">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="form-control">
          <label htmlFor="body">Post Body</label>
          <textarea name="body" id="body"></textarea>
        </div>
        <button type="submit" className="btn btn-block">
          Add Post
        </button>
      </form>
    </>
  );
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const fields = { title, body };

  //@todo database;
  const post = await db.post.create({ data: fields });

  return redirect("/posts");
};

export default NewPost;
