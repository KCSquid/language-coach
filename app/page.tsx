"use client";

import { DoorOpen, Mic } from "lucide-react";
import Script from "next/script";
import React, { useState, useRef } from "react";

declare global {
  interface Window {
    puter?: any;
  }
}

const language = {
  name: "Russian",
  shortTag: "ru",
  fullTag: "ru-RU",
  ttsVoice: "Tatyana",
};

const introPrompt =
  `You are a friendly and encouraging ${language.name} language teacher. ` +
  "I am a complete beginner and don't know any " +
  language.name +
  " yet. " +
  `Your job is to teach me ${language.name} step by step, using clear and simple English explanations. ` +
  "Be supportive and use short, positive sentences. Focus on making me feel confident and excited to learn. " +
  "This should be a conversation, not one big message. " +
  "Let the student practice speaking often. " +
  "This program uses speech to text and text to speech, so the student can hear and practice pronunciation. " +
  "IMPORTANT RULES: " +
  "1. Every piece of text must be inside a language tag, such as <en>...</en> or <ru>...</ru>. " +
  "2. Do not include any text outside of tags. " +
  "3. Always close a tag before switching languages. " +
  "4. You MUST use the correcy language tag when speaking in that language. *<en>привет</en> is BAD*" +
  "5. Do not use Latin letters for Russian words. " +
  "6. When giving examples, you can switch languages using tags. For example: " +
  '   "<ru>привет!</ru><en>Welcome to your Russian journey</en>". ' +
  "7. Only use the correct script for each language tag. " +
  "8. Prefer many smaller messages instead of one long message. " +
  "9. If the student is correct, continue; otherwise, help them out. " +
  "10. No need for things like pro-noun-si-ay-shun. ";

const lessons = [
  {
    title: "👋 Greetings and Introductions",
    instructions:
      `Teach the student how to say 'Hello', 'My name is...', 'What is your name?', 'How are you?', 'Nice to meet you', and 'Bye!' in ${language.name}. ` +
      `Explain each phrase in simple English, and include the ${language.name} phrases in <${language.shortTag}> tags. ` +
      "Encourage the student to repeat after you and practice speaking. " +
      `Give examples like: <${language.shortTag}>привет!</${language.shortTag}><en>Hello!</en> ` +
      "Proceed step by step, one phrase at a time.",
  },
  {
    title: "🧸 Numbers and Age",
    instructions:
      `The student has already learned greetings and introductions in ${language.name}, such as saying hello, asking names, and saying goodbye. ` +
      `Now, teach the student how to count from 1 to 10 in ${language.name}, and how to ask and answer about age. ` +
      `You can group numbers together (for example, teach <${language.shortTag}>один, два, три</${language.shortTag}> *at once [one sentence, simultaneously]*) instead of only one at a time, so the lesson doesn't go on forever. ` +
      `Explain each number and phrase in simple English, and include the ${language.name} words in <${language.shortTag}> tags. ` +
      "Encourage the student to repeat each number and phrase after you. " +
      `Give examples like: <${language.shortTag}>один</${language.shortTag}><en>One</en>. ` +
      `For example, say: <en>Repeat after me:</en><${language.shortTag}>один, два, три</${language.shortTag}><en>One, two, three</en>. ` +
      "Proceed step by step, introducing numbers first (grouped if you like), then age-related questions and answers. " +
      "IMPORTANT: If the student says a number as 1, 2, 3, etc. instead of the " +
      language.name +
      " word, treat it as if they said and pronunced it correctly." +
      "IMPORTANT: This is because of the way the transcript is processed. It will be the same as if they said it correctly.",
  },
  {
    title: "🍏 Food and Drinks",
    instructions:
      `The student has learned greetings, introductions, numbers, and age in ${language.name}. ` +
      `Now, teach the student basic food and drink vocabulary, such as 'apple', 'bread', 'water', 'tea', 'milk', 'I want...', 'Do you like...?', and 'Yes/No'. ` +
      `Introduce each word or phrase in ${language.name} using <${language.shortTag}> tags, and explain in simple English using <en> tags. ` +
      "Encourage the student to repeat after you and practice saying each word and phrase. " +
      `Give examples like: <${language.shortTag}>яблоко</${language.shortTag}><en>Apple</en>. ` +
      "After introducing vocabulary, practice simple questions and answers, such as 'Do you like tea?' and 'I want water.' " +
      "Proceed step by step, and always encourage the student to speak.",
  },
  {
    title: "☕️ Essential Everyday Conversations",
    instructions:
      `The student already knows greetings, introductions, numbers, and age. ` +
      `Now, teach the student useful phrases for everyday situations in ${language.name}, such as ordering food and drinks, asking for directions, shopping, and basic polite interactions. ` +
      "Focus on practical phrases like: " +
      `<${language.shortTag}>Сколько это стоит?</${language.shortTag}><en>How much is this?</en>, ` +
      `<${language.shortTag}>Где находится туалет?</${language.shortTag}><en>Where is the bathroom?</en>, ` +
      `<${language.shortTag}>Можно мне меню, пожалуйста?</${language.shortTag}><en>Can I have the menu, please?</en>, ` +
      `<${language.shortTag}>Я не говорю по-${language.shortTag}ски</${language.shortTag}><en>I don't speak ${language.name}</en>, ` +
      `<${language.shortTag}>Помогите, пожалуйста</${language.shortTag}><en>Help, please</en>. ` +
      `Explain each phrase in simple English, and always use the correct language tags. ` +
      "Encourage the student to repeat and practice each phrase. " +
      "Give examples of short dialogues, such as ordering at a café or asking for help in a store. " +
      "Proceed step by step, introducing one situation at a time, and let the student practice responding. " +
      "Correct mistakes gently and encourage the student to try again. " +
      "Make sure the student feels confident using these phrases in real-life situations.",
  },
  {
    title: "🗺️ Asking for Directions (Roleplay)",
    instructions:
      `You are a friendly local person in a city. The student is a tourist who needs help finding a place (for example, a museum, train station, or café). ` +
      `Have a natural conversation where the student asks for directions in ${language.name}, and you respond as a helpful local. ` +
      `Use simple, clear phrases and encourage the student to ask questions like "<${language.shortTag}>Где находится музей?</${language.shortTag}><en>Where is the museum?</en>". ` +
      `Give directions step by step, using basic words for left, right, straight, near, far, etc., always inside <${language.shortTag}> tags. ` +
      `If the student seems lost or confused, reassure them and repeat or simplify your instructions. ` +
      `You are not teaching vocabulary directly—just being a helpful person in the situation. ` +
      `Encourage the student to thank you or ask follow-up questions. ` +
      `Keep the conversation friendly and supportive, and use both ${language.name} and English explanations as needed.`,
  },
  {
    title: "🎉 Birthday Party Invitation (Roleplay)",
    instructions:
      `You are a friendly neighbor inviting the student to a birthday party. Start by greeting the student and inviting them in ${language.name}. ` +
      `Encourage the student to respond, ask questions about the party (like when, where, what to bring), and practice accepting or politely declining the invitation. ` +
      `Use simple phrases such as "<${language.shortTag}>Приходите на мой день рождения!</${language.shortTag}><en>Come to my birthday party!</en>", "<${language.shortTag}>Когда?</${language.shortTag}><en>When?</en>", "<${language.shortTag}>Где?</${language.shortTag}><en>Where?</en>", and "<${language.shortTag}>Спасибо за приглашение!</${language.shortTag}><en>Thank you for the invitation!</en>". ` +
      `Guide the conversation step by step, helping the student with questions and answers, and encourage them to use both ${language.name} and English as needed. ` +
      `Keep the interaction light, fun, and supportive, focusing on real-life phrases for invitations and responses.`,
  },
];

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const separateTags = (
  text: string
): Array<{ lang: string; content: string }> => {
  const pattern = /<\/?([a-z]{2})>/g;
  const result: Array<{ lang: string; content: string }> = [];
  const stack: string[] = [];
  let lastPos = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const tag = match[1];
    const tagStart = match.index;
    const tagEnd = pattern.lastIndex;
    if (stack.length) {
      const content = text.slice(lastPos, tagStart);
      if (content.trim()) {
        result.push({ lang: stack[stack.length - 1], content: content.trim() });
      }
      if (stack[stack.length - 1] === tag) {
        stack.pop();
      } else {
        stack.push(tag);
      }
    } else {
      stack.push(tag);
    }
    lastPos = tagEnd;
  }
  if (stack.length && lastPos < text.length) {
    const content = text.slice(lastPos);
    if (content.trim()) {
      result.push({ lang: stack[stack.length - 1], content: content.trim() });
    }
  }
  return result.filter((i) => !/^[.!?();:,'"“”‘’]+$/.test(i.content));
};

const useSpeechRecognition = (
  lang: string,
  onResult: (result: string) => void
) => {
  const recognitionRef = useRef<any>(null);
  const start = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === language.shortTag ? language.fullTag : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.onerror = (event: any) => {
      alert("Speech recognition error: " + event.error);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };
  const stop = () => {
    recognitionRef.current?.stop();
  };
  return { start, stop };
};

const geminiPrompt = async (
  context: string[],
  prompt: string,
  useContext = true
): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const contents = useContext ? context.concat([prompt]) : [prompt];
  const messages = contents.map((c) => ({
    role: "user",
    parts: [{ text: c }],
  }));
  const systemInstruction = introPrompt;
  const body = {
    contents: messages,
    system_instruction: {
      role: "system",
      parts: [{ text: systemInstruction }],
    },
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Gemini API error: " + res.status);
    const data = await res.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "<en>Sorry, I couldn't generate a response.</en>";
    return text;
  } catch (e) {
    return `<en>Sorry, Gemini API error: ${e}</en>`;
  }
};

const speak = (
  text: string,
  voice: string,
  language: string,
  resolve: (value: void | PromiseLike<void>) => void,
  utterance: boolean = false
) => {
  if (typeof window === "undefined") return;
  if (utterance) {
    if (!window.speechSynthesis) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = language;
    utter.pitch = 1.25;
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
    resolve();
    return;
  }
  if (!window.puter) return;
  window.puter.ai
    .txt2speech(text, {
      voice,
      language,
    })
    .then((audio: HTMLAudioElement) => {
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play();
    })
    .catch(() => resolve());
};

const TypingBubble = () => (
  <div className="chat-bubble flex items-center gap-1">
    <span className="animate-bounce w-2.5 h-2.5 rounded-full bg-neutral-500" />
    <span
      className="animate-bounce w-2.5 h-2.5 rounded-full bg-neutral-500"
      style={{ animationDelay: "150ms" }}
    />
    <span
      className="animate-bounce w-2.5 h-2.5 rounded-full bg-neutral-500"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);

const Chat = ({
  side,
  text,
  name,
  time,
  status,
  typing,
}: {
  side: "left" | "right";
  text: string;
  name?: string;
  time?: string;
  status?: boolean;
  typing?: boolean;
}) => {
  const breaks = text.split("\n");
  return (
    <div className={`chat ${side === "left" ? "chat-start" : "chat-end"}`}>
      {name && <div className="chat-header">{name}</div>}
      {typing ? (
        <TypingBubble />
      ) : (
        <div className="chat-bubble">
          {breaks.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      )}
      {status && (
        <div className="chat-footer opacity-50">Read {time && `• ${time}`}</div>
      )}
    </div>
  );
};

type Lesson = {
  title: string;
  instructions: string;
};

const LessonSelector = ({
  lessons,
  startLesson,
}: {
  lessons: Lesson[];
  startLesson: (idx: number) => void;
}) => (
  <div className="flex items-center justify-between">
    <h2 className="font-bold text-primary-content text-xl">
      select a lesson:
      <br />
      hover to see the topic
    </h2>
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-primary p-4 rounded-3xl w-fit"
      style={{
        background: "oklch(85% 0.138 181.071 / .35)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        justifySelf: "end",
      }}
    >
      {lessons.map((l, i) => (
        <button
          key={i}
          className="btn btn-border btn-primary w-40 h-40 font-bold text-3xl hover:text-lg"
          onClick={() => startLesson(i)}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.dataset.prevText = btn.innerHTML;
            btn.innerText = l.title.substring(2);
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            if (btn.dataset.prevText) {
              btn.innerHTML = btn.dataset.prevText;
            }
          }}
        >
          {l.title.split(" ")[0]}
        </button>
      ))}
    </div>
  </div>
);

const MessageInput = ({
  userInput,
  setUserInput,
  handleUserInput,
  waiting,
  listening,
  setListening,
  speech,
}: {
  userInput: string;
  setUserInput: (v: string) => void;
  handleUserInput: (input: string) => void;
  waiting: boolean;
  listening: boolean;
  setListening: (v: boolean) => void;
  speech: ReturnType<typeof useSpeechRecognition>;
}) => (
  <div className="flex gap-2">
    <button
      className={`btn btn-primary ${listening ? "bg-blue-100" : ""}`}
      onClick={() => {
        setListening(true);
        speech.start();
      }}
      disabled={waiting || listening}
    >
      <Mic />
    </button>
    <button
      className="btn btn-secondary"
      onClick={() => {
        if (userInput.trim()) handleUserInput(userInput.trim());
      }}
      disabled={waiting || !userInput.trim()}
    >
      Send
    </button>
  </div>
);

const Home = () => {
  const [lessonIdx, setLessonIdx] = useState<number | null>(null);
  const [messages, setMessages] = useState<
    Array<{
      side: "left" | "right";
      text: string;
      name?: string;
      time?: string;
    }>
  >([]);
  const [waiting, setWaiting] = useState(false);
  const [listening, setListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [typingIdx, setTypingIdx] = useState<number | null>(null);
  const contextRef = useRef<string[]>([]);
  const speech = useSpeechRecognition(language.shortTag, (result) => {
    setUserInput(result);
    setListening(false);
  });

  const startLesson = async (idx: number) => {
    setLessonIdx(idx);
    setMessages([]);
    contextRef.current = [];
    setWaiting(true);
    const lesson = lessons[idx];
    const prompt = JSON.stringify(lesson);
    const response = await geminiPrompt(contextRef.current, prompt);
    contextRef.current.push(prompt);
    contextRef.current.push(response);
    handleBotResponse(response);
    setWaiting(false);
  };

  const handleBotResponse = (text: string) => {
    const separated = separateTags(text);
    setListening(true);
    (async () => {
      for (let idx = 0; idx < separated.length; idx++) {
        setMessages((msgs) => [
          ...msgs,
          {
            side: "left",
            text: "",
            name: "Coach",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setTypingIdx(messages.length + idx);
        await new Promise<void>((resolve) => {
          if (typeof window === "undefined" || !window.puter) {
            resolve();
            return;
          }
          window.puter.ai
            .txt2speech(separated[idx].content, {
              voice: language.ttsVoice,
              language:
                separated[idx].lang === language.shortTag
                  ? language.fullTag
                  : "en-US",
            })
            .then((audio: HTMLAudioElement) => {
              audio.onplay = () => {
                setMessages((msgs) => {
                  const newMsgs = [...msgs];
                  newMsgs[messages.length + idx] = {
                    ...newMsgs[messages.length + idx],
                    text: separated[idx].content,
                  };
                  return newMsgs;
                });
                setTypingIdx(null);
              };
              audio.onended = () => resolve();
              audio.onerror = () => resolve();
              audio.play();
            })
            .catch(() => {
              setMessages((msgs) => {
                const newMsgs = [...msgs];
                newMsgs[messages.length + idx] = {
                  ...newMsgs[messages.length + idx],
                  text: separated[idx].content,
                };
                return newMsgs;
              });
              setTypingIdx(null);
              resolve();
            });
        });
      }
      setListening(false);
    })();
  };

  const handleUserInput = async (input: string) => {
    setMessages((msgs) => [
      ...msgs,
      { side: "right", text: input, name: "You" },
    ]);
    setWaiting(true);
    const response = await geminiPrompt(contextRef.current, input);
    contextRef.current.push(input);
    contextRef.current.push(response);
    handleBotResponse(response);
    setWaiting(false);
    setUserInput("");
  };

  return (
    <>
      <Script src="https://js.puter.com/v2/" />
      <div className="bg-linear-150 from-primary to-secondary to-80% w-full h-80 p-16 flex flex-col gap-2">
        <h1 className="font-bold text-5xl text-primary-content">
          language coach
        </h1>
        <h3 className="font-medium text-xl text-primary-content">
          free speaking practice with AI!
        </h3>
      </div>
      <div className="w-screen h-screen p-8 flex flex-col gap-4">
        <div className="bg-linear-180 to-20% from-transparent to-white w-screen absolute left-0 h-64 top-1/2 -translate-y-1/3 pointer-events-none"></div>
        <div
          className="w-11/12 h-fit absolute left-1/2 -translate-x-1/2 top-44 rounded-3xl px-8 py-6"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          {lessonIdx === null ? (
            <LessonSelector lessons={lessons} startLesson={startLesson} />
          ) : (
            <div className="flex flex-col gap-4">
              <div
                className="border border-neutral-200 rounded-xl p-4 flex flex-col gap-1 h-[60vh] overflow-y-auto bg-white"
                ref={(el) => {
                  if (el) {
                    el.scrollTop = el.scrollHeight;
                  }
                }}
              >
                {messages.map((msg, i) => (
                  <Chat
                    key={i}
                    side={msg.side}
                    text={msg.text}
                    name={
                      i === 0 || messages[i - 1].side !== msg.side
                        ? msg.name
                        : undefined
                    }
                    time={
                      i === messages.length - 1 ||
                      messages[i + 1]?.side !== msg.side
                        ? msg.time
                        : undefined
                    }
                    status={
                      i === messages.length - 1 ||
                      messages[i + 1]?.side !== msg.side
                    }
                    typing={i === typingIdx}
                  />
                ))}
                {waiting && (
                  <div className="chat chat-start">
                    <div className="chat-bubble opacity-60">Thinking...</div>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <MessageInput
                  userInput={userInput}
                  setUserInput={setUserInput}
                  handleUserInput={handleUserInput}
                  waiting={waiting}
                  listening={listening}
                  setListening={setListening}
                  speech={speech}
                />
                <div className="flex items-center gap-2">
                  <input
                    className={`absolute left-1/2 -translate-x-1/2 input input-bordered input-primary focus:outline-none select-none cursor-default text-center transition-all duration-300 ${
                      userInput ? "border-primary" : "border-base-300"
                    }`}
                    value={userInput}
                    readOnly
                    placeholder="click the mic and speak!"
                    tabIndex={-1}
                    style={{
                      width: `${Math.max(24, userInput.length)}ch`,
                    }}
                  />
                </div>
                <button
                  className="btn btn-accent"
                  onClick={() => setLessonIdx(null)}
                  disabled={waiting}
                >
                  <DoorOpen />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
