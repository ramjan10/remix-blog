import { Link, useLoaderData } from "@remix-run/react";

export const loader = () => {
  const data = {
    posts: [
      { id: 1, title: "Post 1", body: "this is post" },
      { id: 2, title: "Post 2", body: "this is post" },
      { id: 3, title: "Post 3", body: "this is post" },
    ],
  };
  return data;
};
function PostList() {
  const { posts } = useLoaderData();

  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostList;
