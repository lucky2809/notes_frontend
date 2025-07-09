import React from "react";
import TextareaAutosize from "react-textarea-autosize";

type Note = {
  _id: string;
  title: string;
  description: string;
};

type Props = {
  isNewNote: boolean;
  currentNote: Note | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  closeNewNote: () => void;
  saveHandler: (e: React.FormEvent) => void;
};

const RightPanel: React.FC<Props> = ({ isNewNote, currentNote, handleChange, closeNewNote, saveHandler }) => {
  if (!isNewNote) {
    return (
      <img
        src="pic-1.jpg"
        className="h-full w-full rounded-xl max-sm:hidden object-cover"
        alt="Notes App"
      />
    );
  }

  return (
    <form onSubmit={saveHandler} className="w-full h-full border border-black p-5 flex flex-col gap-7 rounded-lg">
      {/* Title */}
      <div className="flex items-start w-full">
        <p className="text-3xl w-fit">Title:</p>
        <TextareaAutosize
          name="title"
          value={currentNote?.title || ""}
          onChange={handleChange}
          className="border-none outline-0 text-3xl px-4 w-full resize-none"
          minRows={1}
          maxRows={2}
          required
          placeholder="Enter title..."
        />
      </div>

      {/* Description */}
      <div className="flex items-start w-full h-full overflow-scroll bg-gray-100 p-2">
        <TextareaAutosize
          name="description"
          value={currentNote?.description || ""}
          onChange={handleChange}
          className="border-none outline-0 text-xl px-4 w-full resize-none"
          minRows={1}
          required
          placeholder="Enter Text....."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end px-10 max-xl:px-1 pt-3 gap-5">
        <button
          type="button"
          onClick={closeNewNote}
          className="border border-black p-1.5 w-25 rounded-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-700 text-white p-1.5 w-25 rounded-sm cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default RightPanel;
