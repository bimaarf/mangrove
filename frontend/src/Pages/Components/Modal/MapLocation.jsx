import React from "react";

export const MapLocation = () => {
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-2xl mt-6 mb-10">
            Lokasi Tanam Mangrove
          </h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.722628037643!2d108.94362651151332!3d0.39682629959761495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31e2ef8555555555%3A0xc70796a8b2919c6d!2sMempawah%20Mangrove%20Park!5e0!3m2!1sid!2sid!4v1686697309679!5m2!1sid!2sid"
            className="w-11/12 h-96 md:h-96 w-full md:mt-0"
            loading="lazy"></iframe>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
