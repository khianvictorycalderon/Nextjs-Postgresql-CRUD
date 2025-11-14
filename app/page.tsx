'use client';
import handleClientError from "@/lib/error-handling-client";
import SectionContainer from "@/lib/section-container";
import { HeadingText, HeroHeadingText } from "@/lib/typography";
import axios from "axios";
import { useEffect, useState } from "react";

// Input field constant names
const userNameInputField = "user_name";

export default function App() {

  // Requests to the API to automatically create a table if not yet exists
  useEffect(() => {
    async function initialTableCreation() {
      await axios.post("/api/db");
    }
    initialTableCreation();
  },[]);

  const [isSubmittingUserName, setIsSubmittingUserName] = useState<boolean>(false);
  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stops the browser from refreshing
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userName = formData.get(userNameInputField) as string | null; // Casting it as string or null

    if(!userName || userName.trim() == "") {
      alert("User name cannot be empty!");
      return;
    }

    setIsSubmittingUserName(true);

    try {
      await axios.post("/api/user", { userName: userName.trim() });
      console.log("User successfully created!");
    } catch (err: unknown) {
      handleClientError(err, "Failed to create user");
    } finally {
      setIsSubmittingUserName(false);
      form.reset(); // Clears the input field
    }
  }

  return (
    <>
      <SectionContainer className="mt-8">
        <HeroHeadingText className="text-center">Next.js + Postgresql CRUD</HeroHeadingText>
        
        <form onSubmit={handleCreateUser} className="flex gap-2 mt-8">
          <label htmlFor={userNameInputField}><HeadingText>Create User (Username):</HeadingText></label>
          <input disabled={isSubmittingUserName} id={userNameInputField} name={userNameInputField} className="disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed bg-gray-100 p-1 text-black rounded-md outline-none ring-blue-600 focus:ring-2" type="text" />
          <button disabled={isSubmittingUserName} className="px-4 py-2 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-500 transition duration-300" type="submit">Add New User</button>
        </form>

      </SectionContainer>
    </>
  );
}