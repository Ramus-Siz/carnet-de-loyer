export function isTenantInOrder(payments, month, year) {
  // Parcourez les paiements du locataire
  console.log(payments);
  for (const payment of payments) {
    // Vérifiez si le paiement correspond au mois et à l'année spécifiés
    if (payment.month === month && payment.year === year) {
      // Si un paiement est trouvé pour le mois et l'année spécifiés, le locataire est en règle
      return true;
    }
  }
  // Si aucun paiement n'est trouvé pour le mois et l'année spécifiés, le locataire n'est pas en règle
  return false;
}
// Utilisez la fonction isTenantInOrder pour vérifier si le locataire est en règle
