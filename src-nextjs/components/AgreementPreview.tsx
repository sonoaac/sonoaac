import React from "react";

type AgreementPreviewProps = {
  clientName: string;
  projectName: string;
  framework: string;
  hosting: string;
  total: number;
  date: string;
};

const AgreementPreview: React.FC<AgreementPreviewProps> = ({ clientName, projectName, framework, hosting, total, date }) => (
  <div className="bg-gray-100 text-gray-900 rounded-lg p-6 shadow-md max-w-2xl mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4 text-center">Project Agreement</h2>
    <p className="mb-2">This agreement is made between <strong>{clientName || "[Client Name]"}</strong> and SonoAAC for the project <strong>{projectName || "[Project Name]"}</strong>.</p>
    <ul className="mb-4 list-disc pl-6">
      <li><strong>Framework:</strong> {framework || "Next.js/React"}</li>
      <li><strong>Hosting Platform:</strong> {hosting || "Vercel"}</li>
      <li><strong>Total Amount:</strong> ${total || 0}</li>
      <li><strong>Date:</strong> {date || new Date().toLocaleDateString()}</li>
    </ul>
    <p className="mb-2">Upon acceptance, SonoAAC will deliver the project as described, with up to 3 rounds of revisions and 1 month of free maintenance.</p>
    <p className="mb-2">Full website ownership is transferred upon final payment. First year hosting is included (renewal: $100/year).</p>
    <div className="mt-6 flex flex-col items-center">
      <button className="btn btn-main w-full max-w-xs">Sign & Confirm</button>
    </div>
  </div>
);

export default AgreementPreview;
