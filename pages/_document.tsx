import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html
        lang="ja"
        className="text-gray-800 antialiased bg-white js-focus-visible"
      >
        <link
          href="https://fonts.googleapis.com/earlyaccess/hannari.css"
          rel="stylesheet"
        />

        <Head />
        <body className="bg-white">
          <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="container mx-auto mt-2 pt-1">
              <Main />
              <NextScript />
            </div>
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
