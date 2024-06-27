import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border border-slate-200 shadow-sm py-5 px-5  rounded-2xl p-4 bg-white "
    >
      <h1 className="text-lg font-semibold   pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}