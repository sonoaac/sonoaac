import React from "react";

type SectionProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
};

const Section = ({ id, title, children }: SectionProps) => (
  <section className="section" id={id}>
    <h3 className="text-3xl font-bold mb-4">{title}</h3>
    <div>{children}</div>
  </section>
);

export default Section;
