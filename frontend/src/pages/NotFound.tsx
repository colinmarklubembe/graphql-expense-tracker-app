const NotFound = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center text-gray-100">
        {/* 404 Heading */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-400 mb-6">
          404
        </h1>
        <p className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
          Page Not Found
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          The page you were looking for doesn’t exist or may have been moved.
        </p>

        {/* Back Home Button */}
        <a
          href="/"
          className="inline-block bg-gradient-to-br from-blue-500 to-green-500 text-white text-lg md:text-xl font-bold rounded-lg shadow-lg hover:shadow-2xl py-3 px-8 transition duration-200 ease-in-out"
        >
          Take me home
        </a>
      </div>
    </section>
  );
};

export default NotFound;
