export default function Avatar() {
  return (
    <>
      <div className=" flex items-center gap-10 p-4 w-full  border-t-8 border-[#283342] fixed bottom-0">
        <div className="flex items-center gap-4">
          <img
            src="/images/rafiki richard mushagalusa.png"
            alt=""
            className="rounded-[50%] w-[3rem]"
          />
          <div className="flex flex-col gap-0 text-lg  leading-5">
            <p className="text-[#b3b5b7] ">Rafiki </p>
            <p className="text-[#b3b5b7] ">Richard</p>
          </div>
        </div>

        <div className="justify-self-end text-white text-lg">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
      </div>
    </>
  );
}
