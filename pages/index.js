export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800">Hi, I'm Mohit Kandhari</h1>
        <p className="text-gray-600 mt-2">
          I'm an SDE-2 Frontend Engineer passionate about building scalable and performant web applications. Over the past three years, I have extensively worked with Next.js, optimizing builds, improving SEO, implementing advanced caching, and balancing static/dynamic rendering for peak performance. I have experience in building softwares by using typescript, react.js (16, 17, 18), next.js, tailwind, bootstrap, socket.io, firebase, webpack, npm, sass, LESS, LESS variables.
        </p>
        <p className="text-gray-600 mt-4">
          This dashboard contains important machine coding interview solutions, built for personal growth.
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="https://github.com/yourgithub"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
