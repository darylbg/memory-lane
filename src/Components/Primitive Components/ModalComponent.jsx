import React, { Children } from "react";

export default function ModalComponent({children}) {
  return (
    <div className="flex flex-col gap-10 self-center p-5 bg-white bg-opacity-90 rounded-xl sm:w-[400px] w-[90vw] large-box-shadow">
        {children}
    </div>
  );
}
