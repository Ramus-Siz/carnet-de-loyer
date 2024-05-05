import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isTenantInOrder } from "./isTenantInOrder";

function FilterForm({ tenant, setInOder }) {
  console.log(tenant);
  // Utilisez useForm pour gérer le formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const key = "payements";
  // Fonction de soumission du formulaire
  const onSubmit = (data) => {
    console.log(data);
    // Passez les données du formulaire (mois et année) à la fonction onFilter
    let isInOder = isTenantInOrder(tenant[key], data.month, data.year);
    setInOder(isInOder);
  };

  return (
    // Utilisez handleSubmit pour gérer la soumission du formulaire
    <form
      className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Section pour le mois */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Mois:
        </label>
        <select
          id=""
          name="month"
          className={`w-full p-2 border rounded ${
            errors.month ? "border-red-500" : "border-gray-300"
          }`}
          {...register("month", { required: "Mois est obligatoire" })}
        >
          <option value="">Tous les mois</option>
          <option value="01">Janvier</option>
          <option value="02">Février</option>
          <option value="03">Mars</option>
          <option value="04">Avril</option>
          <option value="05">Mai</option>
          <option value="06">Juin</option>
          <option value="07">Juillet</option>
          <option value="08">Août</option>
          <option value="09">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Decembre</option>
        </select>
        {errors.month && (
          <span className="text-red-500 text-sm">{errors.month.message}</span>
        )}
      </div>

      {/* Section pour l'année */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Année:
        </label>
        <select
          id=""
          name="year"
          className={`w-full p-2 border rounded ${
            errors.year ? "border-red-500" : "border-gray-300"
          }`}
          {...register("year", { required: "Année est obligatoire" })}
        >
          <option value="">Toutes les années</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2024">2025</option>
          <option value="2024">2026</option>
          <option value="2024">2027</option>
          <option value="2024">2028</option>
          <option value="2024">2029</option>
          <option value="2024">2030</option>
          <option value="2024">2031</option>
          <option value="2024">2032</option>
          <option value="2024">2033</option>
          <option value="2024">2034</option>
          <option value="2024">2035</option>
          <option value="2024">2036</option>
          <option value="2024">2037</option>
          <option value="2024">2038</option>
          <option value="2024">2039</option>
          <option value="2024">2040</option>

          {/* Ajoutez d'autres années si nécessaire */}
        </select>
        {/* Afficher un message d'erreur si nécessaire */}
        {errors.year && (
          <span className="text-red-500 text-sm">{errors.year.message}</span>
        )}
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full p-3 bg-fuchsia-700 text-white rounded-xl font-semibold hover:bg-[#a1a76a] focus:outline-none focus:ring-2 focus:ring-[#b7bf7f] focus:ring-offset-2"
      >
        Filtrer
      </button>
    </form>
  );
}

export default FilterForm;
