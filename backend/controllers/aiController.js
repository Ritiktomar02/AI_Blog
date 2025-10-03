const { GoogleGenAI } = require("@google/genai");

const {
  blogPostIdeasPrompt,
  generateReplyPrompt,
  blogSummaryPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;

    if (!title || !tone) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = `Write a markdown-formatted blog post titled "${title}". Use a ${tone} tone. Include an introduction, subheadings, code examples if relevant, and a conclusion.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response.candidates[0].content;
    res.status(200).json({ content: rawText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.generateBlogPostIdeas = async (req, res) => {
  try {
    const { topics } = req.body;

    if (!topics) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogPostIdeasPrompt(topics);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = generateReplyPrompt({ author, content });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;
    res.status(200).json(rawText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.generatePostSummary = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogSummaryPrompt(content);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
