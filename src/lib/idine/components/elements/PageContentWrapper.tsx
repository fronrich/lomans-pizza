import { FC, ReactNode } from "react";

interface PageContentWrapperProps {
  children: ReactNode;
}

const PageContentWrapper: FC<PageContentWrapperProps> = ({ children }) => {
  return (
    <section className="not-prose !font-idine absolute top-0 left-0 w-screen h-fit flex flex-col items-center justify-start bg-surface-50">
      <section className=" relative max-w-4xl w-full min-h-screen py-20 lg:py-32 pb:48 px-8 h-full flex flex-col items-start justify-start gap-4">
        {children}
      </section>
    </section>
  );
};

export default PageContentWrapper;
