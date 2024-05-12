export default function HouseModaleWhenDelete({ handleClose, houseAdress }) {
  return (
    <div className="fixed inset-0 p-8 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg ">
        <h1 className="text-lg font-semibold text-center mb-4 text-xl">
          Verification
        </h1>
        <div className="mb-4">
          <p className="text-orange-600 text-xs text-center">
            {` La maison sur ${houseAdress} est sous Contrat et ne peut pas
              être supprimée. Verifier dans la page location? et commencer par suprimer le locataire`}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-fuchsia-600"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
