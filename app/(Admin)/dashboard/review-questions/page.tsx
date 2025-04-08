"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReviewQuestionsForm from "@/components/AllForm/ReviewQuestionsForm";
import SelectTagEntryForm from "@/components/AllForm/SelectTagEntryForm";
import { musicTags } from "@/demoAPI/allTag";
import cross from "@/public/dashboard/icon/cross.svg";
export default function ReviewQuestions() {
  // Add state for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Add questions data array with editable state
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Did the DJ play the right music for the event?",
    },
    {
      id: 2,
      question: "Would you see this DJ again? Yes or No.",
    },
    {
      id: 3,
      question: "How would you rate this DJ's overall performance?",
    },
  ]);

  // Add tags data array
  const [tags, setTags] = useState([
    { id: 1, name: "Great Music" },
    { id: 2, name: "Too Loud" },
    { id: 3, name: "Good" },
    { id: 4, name: "Excellent" },
    { id: 5, name: "Awesome" },
    { id: 6, name: "Energetic" },
    { id: 7, name: "Professional" },
    { id: 8, name: "Creative" },
    { id: 9, name: "Entertaining" },
    { id: 10, name: "Skilled" },
    { id: 11, name: "Punctual" },
    { id: 12, name: "Engaging" },
  ]);

  // Add new state for tag input
  const [newTag, setNewTag] = useState("");

  // Handle question edit
  const handleQuestionChange = (id: number, newValue: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, question: newValue } : q))
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  // Optional: Add remove tag functionality
  const removeTag = (tagId: number) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  // Handle new tag creation
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      // Create new tag with unique ID
      const newTagObj = {
        id: Math.max(...tags.map((t) => t.id), 0) + 1,
        name: newTag.trim(),
      };

      setTags([...tags, newTagObj]);
      // Reset input field
      setNewTag("");

      // Here you would typically make an API call to save the new tag
      // saveNewTag(newTagObj)
    }
  };

  return (
    <>
      <div className="p-6 flex justify-center">
        <div className="inline-flex flex-col justify-start items-start gap-8">
          <div className="self-stretch justify-start text-[#07080b] text-2xl font-semibold font-['Montserrat'] leading-[31.20px] tracking-tight">
            Review Questions
          </div>
          <div className="w-[1040px] px-8 pt-10 pb-14 bg-white rounded-3xl outline-1 outline-offset-[-1px] outline-[#dfe1e6] flex flex-col justify-start items-start gap-10">
            <div className="self-stretch inline-flex justify-end items-start gap-[457px]">
              <button
                onClick={() =>
                  isEditing ? handleSubmit() : setIsEditing(true)
                }
                className="w-[125px] h-12 px-4 py-2 bg-[#e9e9ea] rounded-[99px] flex justify-center items-center gap-2.5 hover:bg-[#d9d9da] transition-colors cursor-pointer"
              >
                <div className="justify-start text-[#1d1f2c] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
                  {isEditing ? "Update" : "Edit"}
                </div>
              </button>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              {questions.map((item) => (
                <div
                  key={item.id}
                  className={`${
                    item.id === 1
                      ? "self-stretch h-[72px] relative"
                      : "w-[976px] h-14 px-6 py-4 rounded-lg outline-1 outline-offset-[-1px] outline-[#d2d2d5] inline-flex justify-start items-center gap-2.5"
                  }`}
                >
                  <div
                    className={`${
                      item.id === 1
                        ? "w-[976px] h-14 px-6 py-4 left-0 top-[16px] absolute rounded-lg outline-1 outline-offset-[-1px] outline-[#d2d2d5] inline-flex justify-start items-center gap-2.5"
                        : ""
                    }`}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) =>
                          handleQuestionChange(item.id, e.target.value)
                        }
                        className="w-[826px] self-stretch px-2 py-1 text-[#07080b] text-lg font-normal font-['Montserrat'] leading-[28.80px] border-none focus:outline-none bg-transparent"
                      />
                    ) : (
                      <div className="w-[826px] self-stretch justify-center text-[#07080b] text-lg font-normal font-['Montserrat'] leading-[28.80px]">
                        {item.question}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-center">
        <div className="inline-flex flex-col justify-start items-start gap-8">
          <div className="self-stretch justify-start text-[#07080b] text-2xl font-semibold font-['Montserrat'] leading-[31.20px] tracking-tight">
            Set Tags
          </div>
          <div className="w-[1040px] px-8 pt-10 pb-14 bg-white rounded-3xl outline-1 outline-offset-[-1px] outline-[#dfe1e6] flex flex-col justify-start items-start gap-10">
            <div
              data-property-1="Add tags"
              className="w-[976px] flex flex-col justify-start items-start gap-4"
            >
              <div className="self-stretch h-14 p-5 bg-white rounded outline-1 outline-offset-[-1px] outline-[#d2d2d5] inline-flex justify-start items-center gap-2.5">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Write tags here"
                  className="w-full bg-transparent border-none focus:outline-none text-[#07080b] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight placeholder:text-[#a5a5ab]"
                />
              </div>
              <div className="self-stretch justify-center">
                <span className="text-[#0f1016] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
                  Suggested:{" "}
                </span>
                <span className="text-[#a5a5ab] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
                  Great Music, Too Loud, Good, Excellent, Awesome
                </span>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-4 flex-wrap content-start">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="pl-1.5 pr-1 py-1.5 bg-[#eceff3] rounded flex justify-center items-center gap-1 cursor-pointer"
                >
                  <div className="justify-center text-[#030304] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
                    {tag.name}
                  </div>
                  <div
                    className="w-3 h-3 relative cursor-pointer"
                    onClick={() => removeTag(tag.id)}
                  >
                    <Image src={cross} alt="Remove" width={12} height={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
