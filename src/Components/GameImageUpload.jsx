import React, { useEffect, useState } from "react";
import exifr from "exifr";
import ModalComponent from "./Primitive Components/ModalComponent";
import back_icon from "../Assets/Icons/back_icon.png";
import upload_icon from "../Assets/Icons/upload_icon.png";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import { useGame } from "../GameContext";
import continue_icon from "../Assets/Icons/continue_icon.png";
import delete_icon from "../Assets/Icons/delete_icon.png";
import heic2any from "heic2any";

export default function GameImageUpload() {
  const { allImages, setAllImages, gameState } = useGame();
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(
    "Select between 2 and 20 photos."
  );
  const [uploadError, setUploadError] = useState("");

  const imageUpload = async (event) => {
    const filesLimit = Array.from(event.target.files).slice(
      0,
      20 - allImages.length
    );

    try {
      setUploading(true);
      setUploadError("");
      let rejectedCount = 0; // Counter for rejected files
      const new_images = [];

      // Get an array of existing file names for comparison
      const existingFileNames = allImages.map((img) =>
        img.originalFile.name.toLowerCase()
      );

      for (const file of filesLimit) {
        let imageUrl;

        // Check for duplicates
        if (existingFileNames.includes(file.name.toLowerCase())) {
          rejectedCount++; // Increment duplicate counter
          console.warn(`File "${file.name}" rejected: Duplicate file name.`);
          continue; // Skip this file
        }

        try {
          // Handle HEIC and HEIF file types
          if (
            file.name.toLowerCase().endsWith(".heic") ||
            file.name.toLowerCase().endsWith(".heif")
          ) {
            const convertedBlob = await heic2any({
              blob: file,
              toType: "image/jpeg",
            });
            imageUrl = URL.createObjectURL(convertedBlob);
          } else {
            // Handle JPEG, PNG, or other supported file types
            imageUrl = URL.createObjectURL(file);
          }

          // Extract metadata using exifr
          const metadata = await exifr.parse(file);

          // Only include files with the DateTimeOriginal metadata tag
          if (metadata?.DateTimeOriginal) {
            new_images.push({
              id: Math.random() + Date.now(),
              imageUrl: imageUrl,
              createdAt: metadata.DateTimeOriginal.toGMTString(),
              metadata,
              originalFile: file,
            });
          } else {
            rejectedCount++; // Increment rejected count for missing metadata
          }
        } catch (err) {
          console.error(`Failed to process file "${file.name}":`, err);
        }
      }

      // Update state with the new images
      if (new_images.length > 0) {
        await setAllImages((allImages) => [...allImages, ...new_images]);
      }

      // Display a message if files were rejected
      // console.log("refected count:", rejectedCount)
      if (rejectedCount === 1) {
        setUploadError(`${rejectedCount} Photo was not usable/duplicate.`);
      } else if (rejectedCount > 1) {
        setUploadError(`${rejectedCount} Photos were not usable/duplicates.`);
      }

      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.error("Error uploading images:", error);
    }
  };

  const remove_image = (id) => {
    setAllImages((prevImages) => prevImages.filter((image) => image.id !== id));
    setUploadError("");
  };

  return (
    <ModalComponent>
      <div className="flex items-center ">
        <NavLinkComponent disabled={uploading} to="/" icon={back_icon} custom_class="back-button" />
        <h2 className="text-lg font-medium text-balance text-center translate-x-1/2">
          UPLOAD PHOTOS
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-medium">{uploadMessage}</p>

        <div>
          <p className="font-medium font-italic text-sm text-red-600">
            {uploadError}
          </p>
          <p className="font-medium text-sm">{allImages.length}/20</p>
        </div>

        {allImages.length !== 0 && (
          <>
            <div className="flex flex-wrap gap-3">
              {allImages.map((image, index) => {
                return (
                  <div key={image.id} className="flex relative">
                    <img
                      src={image.imageUrl}
                      alt="image preview"
                      className="h-[40px] w-[40px] object-cover object-center"
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
        <button
          className={`group secondary-button rounded-md h-[44px] ${
            uploading ^ (allImages.length === 20)
              ? "opacity-80 cursor-not-allowed"
              : ""
          }`}
          disabled={uploading ^ (allImages.length === 20)}
        >
          <label
            htmlFor="imageUpload"
            className={`flex justify-between items-center h-full w-full py-1 px-2 ${
              uploading ^ (allImages.length === 20)
                ? "pointer-events-none cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <span className="font-semibold">
              {uploading
                ? "UPLOADING..."
                : allImages.length === 0
                ? "UPLOAD PHOTOS"
                : allImages.length === 20
                ? "MAXIMUM PHOTOS LOADED"
                : "UPLOAD MORE PHOTOS"}
            </span>
            <img
              src={upload_icon}
              alt="upload icon"
              className={`h-[30px] w-[30px] transition-transform duration-200 ease-in-out ${
                uploading ^ (allImages.length === 20)
                  ? ""
                  : "group-hover:scale-[110%]"
              }`}
            />
          </label>
          <input
            id="imageUpload"
            type="file"
            multiple
            className="hidden"
            disabled={uploading ^ (allImages.length === 20)}
            onChange={imageUpload}
          />
        </button>

        {allImages.length > 1 && (
          <>
            <span className="self-center font-medium text-sm">or</span>
            <NavLinkComponent
            disabled={uploading} 
              to="/"
              icon={continue_icon}
              text="CONTINUE TO PLAY"
              custom_class="primary-button"
            />
          </>
        )}
      </div>
    </ModalComponent>
  );
}
