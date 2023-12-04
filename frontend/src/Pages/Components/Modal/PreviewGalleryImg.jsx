import React from "react";

export const PreviewGalleryImg = ({ item }) => {
  return (
    <>
      <dialog id={`preview-img-${item.id}`} className="modal backdrop-blur-xl">
        <h3 className="font-bold text-lg">Hello!</h3>
        <div className="absolute max-w-full">
          <img
            alt="gallery"
            className="block h-full w-full object-cover object-center transition duration-300 ease-in-out shadow-md"
            src={process.env.REACT_APP_API + "Images/Gallery/" + item.image}
          />
        </div>
        <div className="absolute top-10 left-4">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="bg-black border border-gray-400 bg-opacity-90 hover:scale-90 active:scale-95 duration-300 rounded-full  ease-in-out text-3xl text-white px-5 py-4 font-medium">
              <i className="fa-solid fa-x"></i>
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};
