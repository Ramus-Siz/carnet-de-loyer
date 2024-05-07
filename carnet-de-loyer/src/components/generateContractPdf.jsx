import React, { useState } from "react";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";

const CreateAgreement = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  const generatePDF = async () => {
    try {
      // Effectuer une requête à l'API pour récupérer les données
      const response = await axios.get("http://localhost:3000/my-houses/1");
      const data = response.data;

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
      page.drawText(`Adresse: ${data.adress}`, { x: 30, y: 700 }, { size: 12 });
      page.drawText(`Libellé: ${data.libele}`, { x: 30, y: 670 }, { size: 12 });
      page.drawText(`Type: ${data.type}`, { x: 30, y: 640 }, { size: 12 });
      page.drawText(
        `Composition: ${data.composition}`,
        { x: 30, y: 610 },
        { size: 12 }
      );

      page.drawText(`Adresse: ${data.adress}`, { x: 30, y: 570 }, { size: 12 });
      page.drawText(`Libellé: ${data.libele}`, { x: 30, y: 530 }, { size: 12 });
      page.drawText(`Type: ${data.type}`, { x: 30, y: 490 }, { size: 12 });
      page.drawText(
        `Composition: ${data.composition}`,
        { x: 30, y: 450 },
        { size: 12 }
      );
      page.drawText(`Adresse: ${data.adress}`, { x: 30, y: 410 }, { size: 12 });
      page.drawText(`Libellé: ${data.libele}`, { x: 30, y: 370 }, { size: 12 });
      page.drawText(`Type: ${data.type}`, { x: 30, y: 330 }, { size: 12 });
      page.drawText(
        `Composition: ${data.composition}`,
        { x: 30, y: 250 },
        { size: 12 }
      );
      page.drawText(`Adresse: ${data.adress}`, { x: 30, y: 210 }, { size: 12 });
      page.drawText(`Libellé: ${data.libele}`, { x: 30, y: 170 }, { size: 12 });
      page.drawText(`Type: ${data.type}`, { x: 30, y: 130 }, { size: 12 });
      page.drawText(
        `Composition: ${data.composition}`,
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
    <div className="p-4">
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
  );
};

export default CreateAgreement;
