import React from "react"

namespace Typography {
  interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
  }
  interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
  }
  export const h1: React.FC<HeadingProps> = ({ children }) => {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    )
  }
  export const h2: React.FC<HeadingProps> = ({ children }) => {
    return (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {children}
      </h2>
    )
  }
  export const p: React.FC<ParagraphProps> = ({ children }) => {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
  }
}

export default Typography
