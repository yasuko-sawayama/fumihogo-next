import { Page } from "models/product";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default function PageContent({ title, pageNumber, content }: Page) {
  const contentHtml = documentToHtmlString(content.json);

  return (
    <>
      <div className="mb-4">
        {title && <h2 className="font-semibold text-lg max-w-xl">{title}</h2>}
        <span className="text-sm text-gray-500 right-2 top-4 absolute">
          Page {pageNumber}
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: contentHtml,
        }}
      ></div>
    </>
  );
}
