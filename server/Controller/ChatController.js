const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatController = async (req, res) => {
    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a helpful pet adoption assistant for pet Homies. Answer questions about pet adoption, pet care, 
        and provide friendly advice about pets. Keep responses concise and informative.
        Question: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
};

module.exports = { chatController };