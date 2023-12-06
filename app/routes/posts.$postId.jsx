import { redirect } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { db } from "../db.server";

export const loader = async ({ params }) => {
  const id = parseInt(params.postId);
  const post = await db.post.findUnique({
    where: { id: id },
  });

  if (!post) throw new Error("post not found");

  const data = { post };
  return data;
};

//delete
export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const id = parseInt(params.postId);
    const post = await db.post.findUnique({
      where: { id: id },
    });

    if (!post) throw new Error("post not found");

    await db.post.delete({ where: { id: id } });

    return redirect("/posts");
  }
};

export default function Post() {
  const { post } = useLoaderData();
  const params = useParams();

  return (
    <>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to="/posts" className="btn">
          Back
        </Link>
      </div>
      <div className="page-content">
        <p>{post.body}</p>
      </div>

      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete</button>
          <Link to={`/posts/update/${params.postId}`} className="btn">
            update
          </Link>
        </form>
      </div>
    </>
  );
}
