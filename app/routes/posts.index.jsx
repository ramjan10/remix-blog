import { Link, useLoaderData } from "@remix-run/react";
import Loader from "../component/Loader";
import { db } from "../db.server";

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      take: 20,
      select: { id: true, title: true, body: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return data;
};

function PostList() {
  const { posts } = useLoaderData();

  return (
    <>
      {posts.length == 0 ? (
        <Loader />
      ) : (
        <div>
          <div className="page-header">
            <h1>Posts</h1>
            <Link to="/posts/new" className="btn">
              New Post
            </Link>
          </div>
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/` + post.id}>
                  <h3>{post.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default PostList;
