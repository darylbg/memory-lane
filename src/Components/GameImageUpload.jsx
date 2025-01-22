import React, { useEffect, useState } from "react";
import ModalComponent from "./Primitive Components/ModalComponent";
import back_icon from "../Assets/Icons/back_icon.png";
import upload_icon from "../Assets/Icons/upload_icon.png";
import ButtonComponent from "./Primitive Components/ButtonComponent";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import { useGame } from "../GameContext";
import { useNavigate } from "react-router-dom";
import continue_icon from "../Assets/Icons/continue_icon.png";
import delete_icon from "../Assets/Icons/delete_icon.png";

export default function GameImageUpload() {
  const { allImages, setAllImages, gameState } = useGame();
  const navigate = useNavigate();
  const [uploadMessage, setUploadMessage] = useState("Choose between 2 and 20 photos.");

  const imageUpload = async (event) => {
    try {
      setUploadMessage("Uploading...");
      const new_images = Array.from(event.target.files).map((file) => ({
        id: Date.now() + Math.random(),
        ...file,
        imageUrl: URL.createObjectURL(file),
      }));
      // add images to context
      await setAllImages((allImages) => [...allImages, ...new_images]);
      setUploadMessage("Choose between 2 and 20 photos.");
    } catch (error) {
      console.log("error uploading photos:", error);
      setUploadMessage("Error please try again.");
    }
  };

  const remove_image = (id) => {
    setAllImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <ModalComponent>
      <div className="flex items-center ">
        <NavLinkComponent to="/" icon={back_icon} custom_class="back-button" />
        <h2 className="text-lg font-medium text-balance text-center translate-x-1/2">
          UPLOAD PHOTOS
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-medium">{uploadMessage}</p>
        {allImages.length !== 0 && (
          <>
            <span className="font-medium text-sm">{allImages.length}/20</span>
            <div className="flex flex-wrap gap-3">
              {allImages.map((image, index) => {
                return (
                  <div key={image.id} className="flex relative">
                    <img
                      src={image.imageUrl}
                      alt="image preview"
                      className="h-[40px] w-[40px]"
                    />
                    <button
                      onClick={() => remove_image(image.id)}
                      className="top-0 right-0 -translate-y-[30%] translate-x-[30%] absolute h-[25px] w-[25px] rounded-full group"
                    >
                      <img
                        className="h-full w-full group-hover:scale-[105%]"
                        src={delete_icon}
                        alt="delete"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <button className="group secondary-button rounded-md h-[44px]">
          <label
            htmlFor="imageUpload"
            className="flex justify-between  cursor-pointer h-full w-full items-center py-1 px-2"
          >
            <span className="font-semibold">
              UPLOAD {allImages.length < 2 ? "" : "MORE"} PHOTOS
            </span>
            <img
              src={upload_icon}
              alt="upload icon"
              className="h-[30px] w-[30px] transition-transform duration-200 ease-in-out group-hover:scale-[110%]"
            />
          </label>
        </button>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={imageUpload}
          max={20}
        />
        {allImages.length > 1 && (
          <>
            <span className="self-center font-medium text-sm">or</span>
            <NavLinkComponent
              to="/"
              icon={continue_icon}
              text="CONTINUE TO GAME"
              custom_class="primary-button"
            />
          </>
        )}
      </div>
    </ModalComponent>
  );
}
