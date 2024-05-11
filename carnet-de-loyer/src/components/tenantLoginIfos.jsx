export default function TenantLoginInfos({ handleClose }) {
  return (
    <div className="fixed inset-0 p-8 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h1 className="text-lg font-semibold text-center mb-4">
          Les accès de ce locataire
        </h1>
        <div className="mb-4">
          <p>Password: 122334450</p>
          <p>Code du bailleur: **********</p>
          <p className="text-orange-600">Fermer tout puis actualiser la page</p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-fuchsia-700 text-white px-4 py-2 rounded hover:bg-fuchsia-600"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
