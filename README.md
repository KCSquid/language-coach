# Language Coach

Language Coach is a tool designed to help users improve their language skills through interactive exercises and feedback using Gemini AI. You can use it to simulate talking to a native or learning from a tutor without the hassle of finding someone or paying for it.

## Features

- Interactive speaking and listening exercises
- Real-time feedback on pronunciation and grammar

## Frameworks

- Next.js & TypeScript
- Gemini & puter.js APIs
- daisyUI & Tailwind CSS

## Getting Started

1. Clone the repository:
  ```
  git clone https://github.com/KCSquid/language-coach.git
  ```
2. Install dependencies:
  ```
  pnpm install
  ```
3. Add your API key:
  1. Create a .env file
  2. Add this field:
  ```
  NEXT_PUBLIC_GEMINI_API_KEY=<Your Gemini API Key>
  ```
  - You can get a free Gemini API key at: [Google AI Studio](https://aistudio.google.com/app/apikey)
4. Choose your language:
  1. In `page.tsx`, edit the variable language. I have it set to Russian right now.
  ```
  const language = {
    name: "<Language Name>",
    shortTag: "<Short Form of Language Tag>",
    fullTag: "<Language Tag with Localization>",
    ttsVoice: "<Amazon Polly Voice>",
  };
  ```
  - Voices can be found at: [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/available-voices.html)
  - Not every voice is available (from my expierience).
5. Start the development server:
  ```
  pnpm run dev
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License
