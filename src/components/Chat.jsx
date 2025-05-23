import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function Chat({ isOpen, toggleChat, resume }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingStates, setTypingStates] = useState({});
  const [currentTopic, setCurrentTopic] = useState(null);

  const approvedTopics = [
    "professional background",
    "product management",
    "agile methodologies",
    "scotiabank",
    "crm systems",
    "indoor climbing",
    "gym",
    "running",
    "sci-fi novels",
    "fantasy novels",
    "ai learning",
    "team management",
    "story points",
    "prioritization",
    "roadmap",
    "user stories",
    "user testing",
  ];
  const blockedTopics = ["address", "family", "fraud", "personal information", "live"];

  const topicMap = {
    climbing: "indoor climbing",
    scotiabank: "scotiabank",
    burlington: "burlington",
    "sci-fi": "sci-fi novels",
    fantasy: "fantasy novels",
    "product management": "product management",
    agile: "agile methodologies",
    crm: "crm systems",
    gym: "gym",
    running: "running",
    ai: "ai learning",
    team: "team management",
    "story points": "story points",
    prioritization: "prioritization",
    roadmap: "roadmap",
    "user stories": "user stories",
    "user testing": "user testing",
    experience: "professional background",
    companies: "professional background",
    "scrum master": "agile methodologies",
    project: "professional background",
    projects: "professional background",
  };

  const initialSuggestions = [
    "What’s your role at Scotiabank?",
    "What’s indoor climbing like?",
    "What sci-fi books do you recommend?",
    "How do you prioritize features?",
    "How do you build product roadmaps?",
  ];

  const followUpQuestions = {
    scotiabank: [
      "How long have you been a Product Owner?",
      "What's a lesson learned from your projects at Scotiabank?",
      "What’s the best lesson learned in your current role?",
    ],
    "indoor climbing": [
      "What’s your favorite climbing spot?",
      "How did you get into climbing?",
      "Any tips for new climbers?",
    ],
    "sci-fi novels": [
      "What’s your favorite sci-fi book?",
      "Why do you love sci-fi stories?",
      "Any new sci-fi reads you’re excited about?",
    ],
    "fantasy novels": [
      "What’s a fantasy book you can’t put down?",
      "Why do you enjoy fantasy novels?",
      "Any fantasy authors you recommend?",
    ],
    "product management": [
      "What’s the toughest part of product management?",
      "How do you prioritize features?",
      "What tools do you use for product management?",
    ],
    "agile methodologies": [
      "How do you implement agile in your work?",
      "What’s your favorite agile practice?",
      "Any agile challenges you’ve faced?",
    ],
    "crm systems": [
      "How do you use CRM systems in your work?",
      "What’s your experience with CRM tools?",
      "Any CRM success stories?",
    ],
    gym: [
      "What’s your gym routine like?",
      "Why do you enjoy gym workouts?",
      "Any favorite gym exercises?",
    ],
    running: [
      "What’s your favorite running route?",
      "How did you start running?",
      "Any running goals you’re chasing?",
    ],
    "ai learning": [
      "What AI topics are you exploring?",
      "How do you stay updated on AI?",
      "Any cool AI projects you’re working on?",
    ],
    "team management": [
      "How many team members have you managed?",
      "What’s your approach to mentoring teams?",
      "Any team management challenges you’ve faced?",
    ],
    "story points": [
      "How do you assign story points?",
      "What tools do you use for story points?",
      "Any tips for effective story point estimation?",
    ],
    prioritization: [
      "What’s your prioritization process?",
      "How do you balance stakeholder needs?",
      "Any prioritization tools you recommend?",
    ],
    roadmap: [
      "How do you define a product vision?",
      "What’s your process for story mapping?",
      "Any tips for effective roadmapping?",
    ],
    "user stories": [
      "How do you write effective user stories?",
      "What’s your process for capturing user needs?",
      "Any user story challenges you’ve faced?",
    ],
    "user testing": [
      "How do you conduct user acceptance testing?",
      "What’s your approach to collaborating with stakeholders?",
      "Any user testing success stories?",
    ],
    "professional background": [
      "What’s your most impactful project?",
      "How did you get into product management?",
      "What companies have you worked for?",
    ],
  };

  const isTopicApproved = (input, prevMessages) => {
    const lowerInput = input.toLowerCase();

    // Professional experience keywords
    const experienceKeywords = [
      "work",
      "working",
      "past",
      "years",
      "experience",
      "professional",
      "career",
      "job",
      "role",
      "worked",
      "companies",
      "company",
      "scrum master",
      "projects",
      "project",
      "previous",
      "before",
      "impactful",
      "achievement",
      "success",
    ];
    const isExperienceRelated = experienceKeywords.some((keyword) =>
      lowerInput.includes(keyword)
    );

    // Check if input is a follow-up question matching current topic
    if (currentTopic && followUpQuestions[currentTopic]?.some((q) => q.toLowerCase() === lowerInput)) {
      return { isApproved: true, topic: currentTopic };
    }

    // Direct topic match
    const directMatch = approvedTopics.some((topic) =>
      lowerInput.includes(topic) ||
      lowerInput.split(" ").some((word) => topic.includes(word) || word.includes(topic))
    );
    if (directMatch || isExperienceRelated) {
      let matchedTopic = approvedTopics.find((topic) =>
        lowerInput.includes(topic) ||
        lowerInput.split(" ").some((word) => topic.includes(word) || word.includes(topic))
      );
      if (!matchedTopic && isExperienceRelated) {
        matchedTopic = "professional background";
      }
      return { isApproved: true, topic: topicMap[matchedTopic.split(" ")[0]] || matchedTopic };
    }

    // Check previous context
    if (lowerInput.split(" ").length <= 3 && prevMessages.length > 1) {
      const prevAssistantMessage = prevMessages[prevMessages.length - 1];
      if (prevAssistantMessage.role === "assistant") {
        const prevContent = prevAssistantMessage.content.toLowerCase();
        const prevTopic = approvedTopics.find((topic) => prevContent.includes(topic));
        if (prevTopic) return { isApproved: true, topic: topicMap[prevTopic.split(" ")[0]] || prevTopic };
      }
    }

    return { isApproved: false, topic: null };
  };

  const isTopicBlocked = (input) => {
    const lowerInput = input.toLowerCase();
    return blockedTopics.some((topic) => lowerInput.includes(topic));
  };

  const startTypingAnimation = (messageId, fullText) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypingStates((prev) => ({
          ...prev,
          [messageId]: {
            text: fullText.slice(0, index + 1),
            isTyping: true,
          },
        }));
        index++;
      } else {
        setTypingStates((prev) => ({
          ...prev,
          [messageId]: {
            text: fullText,
            isTyping: false,
          },
        }));
        clearInterval(interval);
      }
    }, Math.random() * 20 + 10);
  };

  const handleSend = async (question = input) => {
    if (!question.trim()) return;

    const userMessage = { role: "user", content: question, id: Date.now() };
    setMessages([...messages, userMessage]);
    setInput("");

    if (isTopicBlocked(question)) {
      const botMessage = {
        role: "assistant",
        content:
          "I’d love to share more about my professional journey or hobbies. Want to hear about my work at Scotiabank or my climbing adventures?",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMessage]);
      setTypingStates((prev) => ({
        ...prev,
        [botMessage.id]: { text: "", isTyping: true },
      }));
      setCurrentTopic(null);
      startTypingAnimation(botMessage.id, botMessage.content);
      return;
    }

    const { isApproved, topic } = isTopicApproved(question, messages);
    if (!isApproved) {
      const botMessage = {
        role: "assistant",
        content:
          "That’s a bit off-topic. I’d love to talk about my professional experience, like my work at Scotiabank, or my hobbies like climbing or sci-fi books. What’s on your mind?",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMessage]);
      setTypingStates((prev) => ({
        ...prev,
        [botMessage.id]: { text: "", isTyping: true },
      }));
      setCurrentTopic(null);
      startTypingAnimation(botMessage.id, botMessage.content);
      return;
    }

    setCurrentTopic(topic);

    // Check if API key is available
    if (!import.meta.env.VITE_XAI_API_KEY) {
      console.error("VITE_XAI_API_KEY is missing. Chat functionality disabled.");
      const botMessage = {
        role: "assistant",
        content:
          "Sorry, I’m having trouble connecting right now. Let’s talk about my work or hobbies later!",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMessage]);
      setTypingStates((prev) => ({
        ...prev,
        [botMessage.id]: { text: "", isTyping: true },
      }));
      setCurrentTopic(null);
      startTypingAnimation(botMessage.id, botMessage.content);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.x.ai/v1/chat/completions",
        {
          model: "grok-3", // Updated model name (verify with https://x.ai/api)
          messages: [
            {
              role: "system",
              content: `
                You are Grok, an AI assistant embodying Joaquin Ferrer's voice for his resume website. Respond as Joaquin Ferrer, using first-person pronouns (e.g., 'I', 'my'). For professional background questions (e.g., Scotiabank, product management, agile methodologies, team management, story points, prioritization, roadmap, user stories, user testing, past experience, other companies, Scrum Master projects, impactful projects), base responses strictly on my resume’s 'experience' and 'additionalInfo' sections, describing my roles, companies, and specific projects or responsibilities. For questions about projects, highlight key achievements or impactful work from any role in the 'experience' section, selecting the most relevant or significant project based on the question. Include all relevant experience from the resume, not just Scotiabank, for questions about past work or companies. Do not assume specific domains (e.g., mortgages, lending, housing) unless explicitly listed. If details are missing, use the 'profile' section’s general description. For hobbies (indoor climbing, gym, running, sci-fi/fantasy novels, AI learning) or Burlington, ON, use general knowledge. Provide captivating, cohesive responses (3–5 sentences, 75–160 words) with clear, direct, professional language, avoiding analogies, metaphors, or figurative expressions. Use specific details or achievements to engage conversationally without copying resume text. Do NOT end with questions. If asked about sensitive topics (e.g., address, family, fraud), redirect with: 'I’d love to share more about my professional journey or hobbies—how about my work at Scotiabank or my climbing adventures?'

                **Resume Context**:
                - **Profile**: ${resume.profile}
                - **Experience**: ${JSON.stringify(resume.experience)}
                - **Skills**: ${resume.skills.join(", ")}
                - **Certifications**: ${resume.certifications.map((c) => c.name).join(", ")}
                - **Additional Information**:
                  - **Team Management**: ${resume.additionalInfo.teamManagement}
                  - **Story Points**: ${resume.additionalInfo.storyPoints}
                  - **Prioritization**: ${resume.additionalInfo.prioritization}
                  - **Roadmap**: ${resume.additionalInfo.roadmap}
                  - **User Stories**: ${resume.additionalInfo.userStories}
                  - **User Testing**: ${resume.additionalInfo.userTesting}
              `,
            },
            ...messages,
            userMessage,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_XAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMessage]);
      setTypingStates((prev) => ({
        ...prev,
        [botMessage.id]: { text: "", isTyping: true },
      }));
      startTypingAnimation(botMessage.id, botMessage.content);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      let errorMessage = "Oops, something went wrong. Let’s talk about my work or hobbies instead!";
      if (error.response?.status === 400 && error.response?.data?.error?.includes("model")) {
        console.error("Invalid model specified. Please verify the model name in xAI API documentation.");
        errorMessage = "Sorry, I’m having trouble with my AI setup. Try asking about my work at Scotiabank or my hobbies!";
      } else if (error.response?.status === 401) {
        console.error("Invalid or missing API key.");
        errorMessage = "I’m having trouble connecting. Let’s chat about my professional experience or hobbies!";
      }
      const botMessage = {
        role: "assistant",
        content: errorMessage,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMessage]);
      setTypingStates((prev) => ({
        ...prev,
        [botMessage.id]: { text: "", isTyping: true },
      }));
      setCurrentTopic(null);
      startTypingAnimation(botMessage.id, botMessage.content);
    }
  };

  const handleSuggestionClick = (question) => {
    setInput(question);
    handleSend(question);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-white w-[90vw] h-[80vh] rounded-lg shadow-xl flex flex-col sm:w-112 sm:h-[500px] z-[1000]"
        >
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition"
            aria-label="Close chat"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-gray-600 text-center mb-4">
                <ChatBubbleLeftIcon className="h-8 w-8 mx-auto mb-2" />
                <p>Welcome! Ask me about my work or hobbies.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {initialSuggestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.role === "assistant" && typingStates[msg.id]?.isTyping ? (
                    <>
                      {typingStates[msg.id].text.split("").map((char, index) => (
                        <motion.span
                          key={`${msg.id}-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      <span className="blinking-cursor">|</span>
                    </>
                  ) : (
                    msg.content
                  )}
                </span>
              </div>
            ))}
            {messages.length > 0 &&
              typingStates[messages[messages.length - 1]?.id]?.isTyping === false &&
              currentTopic &&
              followUpQuestions[currentTopic] && (
                <div className="mt-2 px-4">
                  <p className="text-sm text-gray-600 mb-2">Keep Exploring:</p>
                  <div className="flex flex-wrap gap-2">
                    {followUpQuestions[currentTopic].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(question)}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask about my work or hobbies..."
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Chat;