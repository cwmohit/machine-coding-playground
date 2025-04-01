"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const DynamicEditor = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("noteContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("noteContent", content);
    alert("Note saved successfully!");
  };

  const config = {
    buttons: "bold,italic,underline,strikethrough,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,image,spellcheck,table,link,ai-assistant,indent,outdent",
    defaultMode: 1,
    toolbarAdaptive: false,
    minHeight: 600,
    maxHeight: '100%',
    toolbarButtonSize: "small",
  };

  return (
    <div className="w-full min-h-screen p-10 flex flex-col gap-10">
      <div className="flex justify-between items-center gap-10">
        <h1 className="text-3xl font-bold text-center">Create Your Document</h1>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="px-10 py-2 border-2 rounded-2xl font-bold bg-gray-900 sketch-button"
          >
            Save Note
          </button>
        </div>
      </div>
      <div className="w-full max-w-full mx-auto flex flex-col gap-8">
        <JoditEditor
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)} // Updates content on blur
          className="border border-gray-300 text-black rounded-md w-full h-full bg-white p-4"
        />
      </div>
    </div>
  );
};

export default DynamicEditor;