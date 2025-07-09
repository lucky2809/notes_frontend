import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Header from './Header';
import RightPanel from './RightPanel';
import { useAuth } from '../auth/AuthProvider';

type Note = {
  _id: string;
  title: string;
  description: string;
};


const Dashboard: React.FC = () => {
  const { logout } = useAuth()
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [isNewNote, setIsNewNote] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  // Refs for title and description
  // const titleRef = useRef<HTMLTextAreaElement>(null);
  // const descriptionRef = useRef<HTMLTextAreaElement>(null);

  console.log(currentNote)
  // Toggle Creatnote form
  const createNewNote = () => {
    setEditMode(false)
    setEditNoteId(null)
    setCurrentNote({
      _id: "",
      title: "",
      description: ""
    })
    setIsNewNote(true);
  };

  // Toggle Closenote form
  const closeNewNote = () => {
    setCurrentNote({
      _id: "",
      title: "",
      description: ""
    })
    setIsNewNote(false);
  };

  // Toggle Creatnote form
  const openNote = (data: Note) => {
    setCurrentNote(data);
    setEditNoteId(data._id)
    setIsNewNote(true)
    setEditMode(true)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentNote) {
      setCurrentNote({ ...currentNote, [name]: value });
    }
  };

  // Save handler
  const saveHandler = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!currentNote) {
      console.error("current note is null")
      return
    };

    const object = {
      title: currentNote.title || '',
      description: currentNote.description || '',
    };

    try {
      const url = editMode
        ? `${import.meta.env.VITE_API_URL}/notes/${editNoteId}`
        : `${import.meta.env.VITE_API_URL}/create-notes/`;

      const method = editMode ? "PUT" : "POST";
      const token = localStorage.getItem("access_token")
      const fetchData = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(object)
      });
      if (fetchData.ok) {
        alert(editMode ? "Note updated!" : "Note created!");
      } else {
        throw "server error"
      }
      const response = await fetchData.json();

      setIsUpdated(prev => !prev)
      console.log(response);

      // Reset after save
      // setIsNewNote(false);
      // setEditMode(false);
      // setEditNoteId(null);

    } catch (err: any) {
      logout()
      console.log("Something Went Wrong ..! ", err);
      alert(err.message)
    }
  };
  // Show Save Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("access_token")

        const res = await fetch(`${import.meta.env.VITE_API_URL}/all-notes`, {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          const error = await res.json();
          throw new Error(error.message || "Auth Error")
        }
        if (!res.ok) {
          const data = await res.json();
          console.error(data)
          return
        }
        const data = await res.json();
        setNotes(data);

      } catch (err) {
        logout()
        console.error('Failed to fetch notes', err);
      }
    };

    fetchNotes();
  }, [isUpdated]);


  // Delete Note
  const deleteNote = async (id: string) => {
    try {
      const token = localStorage.getItem("access_token")

      const res = await fetch(`${import.meta.env.VITE_API_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);

      setNotes(prev => prev.filter(note => note._id !== id));
      setCurrentNote({
        _id: "",
        title: "",
        description: ""
      })
    } catch (err) {
      logout()
      console.error('Error deleting note:', err);
      alert('Failed to delete note.');
    }
  };


  // const RightPanel: React.FC = () => {
  //   return(
  //     <div className="w-full h-full max-md:w-full">
  //         {isNewNote ? (
  //           <div className="w-full h-full border border-black p-5 flex flex-col gap-7 rounded-lg">
  //             {/* Title */}
  //             <div className="flex items-start w-full">
  //               <p className="text-3xl w-fit">Title:</p>
  //               <TextareaAutosize
  //                 name="title"
  //                 value={currentNote?.title || ""}
  //                 onChange={handleChange}
  //                 className="border-none outline-0 text-3xl px-4 w-full resize-none"
  //                 minRows={1}
  //                 maxRows={2}
  //                 required
  //                 placeholder="Enter title..."
  //               />
  //             </div>
  //             <div className="flex items-start w-full h-full overflow-scroll bg-gray-100 p-2">
  //               <TextareaAutosize
  //                 name="description"
  //                 value={currentNote?.description || ""}
  //                 onChange={handleChange}
  //                 className="border-none outline-0 text-xl px-4 w-full resize-none"
  //                 minRows={1}
  //                 required
  //                 placeholder="Enter Text....."
  //               />
  //             </div>

  //             {/* Save Button */}
  //             <div className="flex justify-end px-10 max-xl:px-1 pt-3 gap-5">
  //               <Link to="/">
  //                 <button
  //                   onClick={closeNewNote}
  //                   className="border-1 border-black p-1.5 w-25 rounded-sm cursor-pointer"
  //                 >
  //                   Cancle
  //                 </button>
  //               </Link>
  //               <Link to="/">
  //                 <button
  //                   onClick={saveHandler}
  //                   className="bg-blue-700 text-white p-1.5 w-25 rounded-sm cursor-pointer"
  //                 >
  //                   Save
  //                 </button>
  //               </Link>
  //             </div>
  //           </div>
  //         ) : (
  //           <img
  //             src="pic-1.jpg"
  //             className="h-full w-full rounded-xl max-sm:hidden object-cover"
  //             alt="Dashboard visual"
  //           />
  //         )}
  //       </div>
  //   )

  // }

  // Move this outside of Dashboard component
  // const RightPanel: React.FC<{
  //   isNewNote: boolean;
  //   currentNote: Note | null;
  //   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  //   closeNewNote: () => void;
  //   saveHandler: (e: React.FormEvent) => void;
  // }> = ({ isNewNote, currentNote, handleChange, closeNewNote, saveHandler }) => {
  //   return (
  //     <div className="w-full h-full max-md:w-full">
  //       {isNewNote ? (
  //         <div className="w-full h-full border border-black p-5 flex flex-col gap-7 rounded-lg">
  //           {/* Title */}
  //           <div className="flex items-start w-full">
  //             <p className="text-3xl w-fit">Title:</p>
  //             <TextareaAutosize
  //               name="title"
  //               value={currentNote?.title}
  //               onChange={handleChange}
  //               className="border-none outline-0 text-3xl px-4 w-full resize-none"
  //               minRows={1}
  //               maxRows={2}
  //               required
  //               placeholder="Enter title..."
  //             />
  //           </div>
  //           <div className="flex items-start w-full h-full overflow-scroll bg-gray-100 p-2">
  //             <TextareaAutosize
  //               name="description"
  //               value={currentNote?.description}
  //               onChange={handleChange}
  //               className="border-none outline-0 text-xl px-4 w-full resize-none"
  //               minRows={1}
  //               required
  //               placeholder="Enter Text....."
  //             />
  //           </div>

  //           {/* Save Button */}
  //           <div className="flex justify-end px-10 max-xl:px-1 pt-3 gap-5">
  //             <Link to="/">
  //               <button
  //                 onClick={closeNewNote}
  //                 className="border-1 border-black p-1.5 w-25 rounded-sm cursor-pointer"
  //               >
  //                 Cancel
  //               </button>
  //             </Link>
  //             <Link to="/">
  //               <button
  //                 onClick={saveHandler}
  //                 className="bg-blue-700 text-white p-1.5 w-25 rounded-sm cursor-pointer"
  //               >
  //                 Save
  //               </button>
  //             </Link>
  //           </div>
  //         </div>
  //       ) : (
  //         <img
  //           src="pic-1.jpg"
  //           className="h-full w-full rounded-xl max-sm:hidden object-cover"
  //           alt="Dashboard visual"
  //         />
  //       )}
  //     </div>
  //   );
  // };



  return (
    <div>
      <div className="p-2 py-5 flex max-md:flex-col h-screen">
        {/* Left Panel */}
        <div className="w-[40%] max-sm:w-full h-screen flex flex-col overflow-hidden px-20 max-xl:px-5 gap-10">
          {/* Header */}
          <Header />
          {/* Mobile view Right Panel */}
          <div className='min-md:hidden'>
            <RightPanel
              isNewNote={isNewNote}
              currentNote={currentNote}
              handleChange={handleChange}
              closeNewNote={closeNewNote}
              saveHandler={saveHandler}
            />
          </div>
          {/* Create Note Button */}
          <button
            onClick={createNewNote}
            className="text-lg bg-blue-700 text-white font-semibold p-1.5 w-full rounded-sm"
          >
            Create Note
          </button>

          {/* Notes List */}
        { notes.length > 0 && <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Notes</p>
            {notes.map((note) => (<div onClick={() => openNote(note)} className="p-2 px-5 rounded-sm flex justify-between gap-4 shadow-sm shadow-gray-300">
              <p className="text-lg">{note.title}</p>
              <button onClick={() => deleteNote(note._id)} className='hover:bg-red-600 hover:text-white cursor-pointer rounded-sm'>
                <Icon width={30} icon="material-symbols-light:delete-outline" />
              </button>
            </div>))}
          </div>}
        </div>

        {/* Right Panel */}
        <div className='max-md:hidden w-[60%]'>
          <RightPanel
            isNewNote={isNewNote}
            currentNote={currentNote}
            handleChange={handleChange}
            closeNewNote={closeNewNote}
            saveHandler={saveHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
