import React, { useState } from "react";

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jobDescription);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnJobDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobTitle,
        industry,
        keyWords,
        tone,
        numWords,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setJobDescription(data.jobDescription.trim());
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="jobTitle">
                Meslek Başlığı
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="jobTitle"
                placeholder="Meslek Başlığı"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="industry" className="sr-only">
                Endüstri
              </label>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Endüstri (Opsiyonel)"
                type="text"
                name="industry"
                id="industry"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                Yapay zeka için Anahtar kelimeler (Opsiyonel)
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="İş Tanımı için Anahtar Kelimeler (Opsiyonel)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Üslup
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tone"
                id="tone"
              >
                <option value="default">Üslubu Seç (Opsiyonel)</option>
                <option value="casual">Gündelik</option>
                <option value="friendly">Arkadaş Canlısı</option>
                <option value="professional">Profesyonel</option>
                <option value="formal">Resmi</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Words (Optional)
              </label>
              <input
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
                type="number"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Üretilecek Kelime Sayısı - Varsayılan 200 (Opsiyonel)"
                name="words"
                id="words"
              />
            </div>

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || jobTitle === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || jobTitle === ""}
            >
              {isGenerating ? "Oluşturuyor..." : "İş Tanımı Oluştur"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                jobDescription === ""
                  ? 7
                  : jobDescription.split("\n").length + 12
              }
              name="output"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={jobDescription === ""}
              id="output"
              placeholder="Yapay Zeka Tarafından Üretilen İş Tanımı"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={jobDescription === ""}
            >
              {isCopied ? "Kopyalandı" : "Kopyala"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}