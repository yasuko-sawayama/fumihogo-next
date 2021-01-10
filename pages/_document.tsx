import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="ja"
        className="text-gray-800 antialiased bg-white js-focus-visible"
      >
        <Head />
        <body className="bg-white">
          <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="container mx-auto mt-4 pt-12">
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
