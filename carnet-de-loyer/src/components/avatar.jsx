export default function Avatar() {
  const getCurrentUser = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(getCurrentUser);
  return (
    <>
      <div className=" flex justify-between items-center gap-10 p-4 w-full md:w-[14.8em] border-t-8 border-[#283342] md:fixed bottom-0">
        <div className="flex justify-center items-center gap-4">
          <span className="flex items-center text-[#b3b5b7] text-[50px]">
            <ion-icon name="person-circle-outline"></ion-icon>
          </span>

          <div className="flex flex-col gap-0 text-lg  leading-5">
            <p className="text-[#b3b5b7] ">{currentUser.username} </p>
            <p className="text-[#b3b5b7] ">{`ID: ${currentUser.id}`}</p>
          </div>
        </div>

        <div className="justify-self-end text-white text-lg">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
      </div>
    </>
  );
}
