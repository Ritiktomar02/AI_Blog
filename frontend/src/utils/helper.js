import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getinitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const getToastMessageByType = (type) => {
  switch (type) {
    case "edit":
      return "Blog post updataed successfully";
    case "draft":
      return "Blog post saves as draft successfully";
    case "published":
      return "Blog post published successfully";

    default:
      return "Blog post updataed successfully";
  }
};
