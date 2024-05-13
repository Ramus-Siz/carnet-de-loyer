import React, { useState } from "react";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import { BASE_API_URL } from "../utils/config";
import Logo from "./logo";
import TenantHeaderMobile from "./tenantsDashboard/tenant-header-mobile";

const CreateAgreement = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  const generatePDF = async () => {
    try {
      const getHouse = sessionStorage.getItem("house");
      const house = JSON.parse(getHouse);
      // Effectuer une requête à l'API pour récupérer les données

      // Créer un nouveau document PDF
      const pdfDoc = await PDFDocument.create();

      // Ajouter une nouvelle page au document
      const page = pdfDoc.addPage();

      // Définir la taille de la page
      page.setSize(650, 850); // Taille de page par défaut (8.5 x 11 pouces)

      // Définir la couleur et la taille du texte
      page.drawText("CONTRAT DE BAIL", {
        x: 200,
        y: 780,
        size: 24,
        color: rgb(0, 0, 1),
      });

      // Ajouter les données au document
      page.drawText(
        `Adresse: ${house.adress}`,
        { x: 30, y: 700 },
        { size: 12 }
      );
      page.drawText(`Libellé: ${house.type}`, { x: 30, y: 670 }, { size: 12 });
      page.drawText(
        `Type: ${house.composition}`,
        { x: 30, y: 640 },
        { size: 12 }
      );
      page.drawText(
        `Composition: ${house.composition}`,
        { x: 30, y: 610 },
        { size: 12 }
      );

      page.drawText(
        `Adresse: ${house.description}`,
        { x: 30, y: 570 },
        { size: 12 }
      );
      page.drawText(
        `Libellé: ${house.adress}`,
        { x: 30, y: 530 },
        { size: 12 }
      );
      page.drawText(`Type: ${house.type}`, { x: 30, y: 490 }, { size: 12 });
      page.drawText(
        `Composition: ${house.composition}`,
        { x: 30, y: 450 },
        { size: 12 }
      );
      page.drawText(
        `Adresse: ${house.description}`,
        { x: 30, y: 410 },
        { size: 12 }
      );
      page.drawText(
        `Libellé: ${house.composition}`,
        { x: 30, y: 370 },
        { size: 12 }
      );
      page.drawText(`Type: ${house.type}`, { x: 30, y: 330 }, { size: 12 });
      page.drawText(
        `Composition: ${house.composition}`,
        { x: 30, y: 250 },
        { size: 12 }
      );
      page.drawText(`Adresse: ${house.type}`, { x: 30, y: 210 }, { size: 12 });
      page.drawText(
        `Libellé: ${house.adress}`,
        { x: 30, y: 170 },
        { size: 12 }
      );
      page.drawText(`Type: ${house.type}`, { x: 30, y: 130 }, { size: 12 });
      page.drawText(
        `Composition: ${house.composition}`,
        { x: 30, y: 90 },
        { size: 12 }
      );

      // Récupérer le Blob du document PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      setPdfBlob(pdfBlob);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données depuis l'API :",
        error
      );
    }
  };

  return (
    <>
      <TenantHeaderMobile />

      <div className=" flex md:h-screen h-96 flex-col items-center justify-center p-4">
        <button
          className="bg-gradient-to-r from-fuchsia-700 to-fuchsia-700 hover:from-[#283342] hover:to-fuchsia-700 ... p-3 text-white rounded-3xl w-[20em]"
          onClick={generatePDF}
        >
          Voir mon contrat
        </button>
        {pdfBlob && (
          <div className="mt-4">
            <iframe
              title="contrat de bail"
              src={URL.createObjectURL(pdfBlob)}
              className="w-full h-72"
            />
            <a
              href={URL.createObjectURL(pdfBlob)}
              download="donnees.pdf"
              className="block mt-2 text-blue-500"
            >
              Télécharger PDF
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateAgreement;
