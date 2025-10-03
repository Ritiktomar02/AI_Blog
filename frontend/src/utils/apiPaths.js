export const BASE_URL = import.meta.env.VITE_BASE_URL;


export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register", 
    LOGIN: "/api/v1/auth/login", 
    GET_PROFILE: "/api/v1/auth/profile", 
  },

  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/v1/dashboard-summary", 
  },

  AI: {
    GENERATE_BLOG_POST: "/api/v1/ai/generate", 
    GENERATE_BLOG_POST_IDEAS: "/api/v1/ai/generate-ideas", 
    GENERATE_COMMENT_REPLY: "/api/v1/ai/generate-reply", 
    GENERATE_POST_SUMMARY: "/api/v1/ai/generate-summary", 
  },

  POSTS: {
    CREATE: "/api/v1/posts", 
    GET_ALL: "/api/v1/posts", 
    GET_TRENDING_POSTS: "/api/v1/posts/trending", 
    GET_BY_SLUG: (slug) => `/api/v1/posts/slug/${slug}`, 
    UPDATE: (id) => `/api/v1/posts/${id}`, 
    DELETE: (id) => `/api/v1/posts/${id}`, 
    GET_BY_TAG: (tag) => `/api/v1/posts/tag/${tag}`, 
    SEARCH: "/api/v1/posts/search", 
    INCREMENT_VIEW: (id) => `/api/v1/posts/${id}/view`, 
    LIKE: (id) => `/api/v1/posts/${id}/like`, 
  },

  COMMENTS: {
    ADD: (postId) => `/api/v1/comments/${postId}`, 
    GET_ALL: "/api/v1/comments", 
    GET_ALL_BY_POST: (postId) => `/api/v1/comments/${postId}`, 
    DELETE: (commentId) => `/api/v1/comments/${commentId}`, 
  },
};