import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/Blog/BlogLandingPage.jsx";
import BlogPostView from "./pages/Blog/BlogPostView.jsx";
import PostByTags from "./pages/Blog/PostByTags.jsx";
import SearchPosts from "./pages/Blog/SearchPosts.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import BlogPosts from "./pages/Admin/BlogPosts.jsx";
import BlogPostEditor from "./pages/Admin/BlogPostEditor.jsx";
import Comments from "./pages/Admin/Comments";
import PrivateRoute from "./routes/PrivateRoute.jsx";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BlogLandingPage />} />
          <Route path="/:slug" element={<BlogPostView />} />
          <Route path="/tag/:tagName" element={<PostByTags />} />
          <Route path="/search" element={<SearchPosts />} />

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<BlogPosts />} />
            <Route path="/admin/create" element={<BlogPostEditor />} />
            <Route
              path="/admin/edit/:postSlug"
              element={<BlogPostEditor isEdit={true} />}
            />
            <Route path="/admin/comments" element={<Comments />} />
          </Route>

          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          style: { fontSize: "13px" },
        }}
      />
    </UserProvider>
  );
};

export default App;
