"use client";
import UploadForm from "../components/UploadForm";
import ResultDisplay from "../components/ResultDisplay";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <UploadForm onResult={setResult} />
      {result && <ResultDisplay text={result.text} keywords={result.keywords} />}
    </div>
  );
}
