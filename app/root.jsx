import { Link, Links, LiveReload, Meta, Outlet } from "@remix-run/react";
import globalStylesUrl from "./styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];

export const meta = () => {
  const description = "A blog";
  const keyword = "remix, blog";
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title ? title : "My remix blog"}</title>
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="auth/login">Login</Link>
          </li>
          <li>
            <Link to="auth/register">Register</Link>
          </li>
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
}

export function ErrorBoundry({ error }) {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p> {error.message} </p>
      </Layout>
    </Document>
  );
}
