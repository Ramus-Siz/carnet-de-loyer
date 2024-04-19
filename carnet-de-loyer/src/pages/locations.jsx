import Header from "../components/header";

export default function Locations() {
  return (
    <>
      <Header />
      <div className="p-1">
        <table className="border border-1 w-full text-[#b3b5b7] ">
          <thead>
            <tr className="bg-[#c299d0] text-white">
              <th className="border border-1 border-[#5f6263] p-4">
                Locataire
              </th>
              <th className="border border-1 border-[#5f6263] p-4">
                Téléphone
              </th>
              <th className="border border-1  border-[#5f6263] p-4">Adresse</th>
              <th className="border border-1 border-[#5f6263] p-4">Maison</th>
              <th className="border border-1 border-[#5f6263] p-4">
                Début du contrat
              </th>
              <th className="border border-1  border-[#5f6263] p-4">
                Fin du contrat
              </th>
              <th className="border border-1 border-[#5f6263] p-4">État</th>
            </tr>
          </thead>
          <tbody className="border border-1 border-[#5f6263]">
            <tr className="border border-1 border-[#5f6263]">
              <td className="border border-1  border-[#5f6263] p-4">
                John Doe
              </td>
              <td className="border border-1 border-[#5f6263] p-4">
                123456789
              </td>
              <td className="border border-1 border-[#5f6263] p-4">
                123 Main Street
              </td>
              <td className="border border-1 border-[#5f6263] p-4">House 1</td>
              <td className="border border-1 border-[#5f6263] p-4">
                2024-01-01
              </td>
              <td className="border border-1 border-[#5f6263] p-4">
                2024-12-31
              </td>
              <td className="border border-1 border-[#5f6263] p-4">Actif</td>
            </tr>
            <tr className="border border-1 bg-[#b7bf7f] text-white">
              <td className="border border-1 border-[#5f6263] p-4">John Doe</td>
              <td className="border border-1 border-[#5f6263] p-4">
                123456789
              </td>
              <td className="border border-1 border-[#5f6263] p-4">
                123 Main Street
              </td>
              <td className="border border-1 border-[#5f6263] p-4">House 1</td>
              <td className="border border-1 border-[#5f6263] p-4">
                2024-01-01
              </td>
              <td className="border border-1 border-[#5f6263] p-4">
                2024-12-31
              </td>
              <td className="border border-1 border-[#5f6263] p-4">Actif</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

// {
//   <table border="1">
//     <thead>
//       <tr>
//         <th>Locataire</th>
//         <th>Téléphone</th>
//         <th>Adresse</th>
//         <th>Maison</th>
//         <th>Début du contrat</th>
//         <th>Fin du contrat</th>
//         <th>État</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((item, index) => (
//         <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
//           <td>{item.locataire}</td>
//           <td>{item.telephone}</td>
//           <td>{item.adresse}</td>
//           <td>{item.maison}</td>
//           <td>{item.debutContrat}</td>
//           <td>{item.finContrat}</td>
//           <td>{item.etat}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>;
// }
