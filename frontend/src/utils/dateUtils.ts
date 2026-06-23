// Parsea la parte "YYYY-MM-DD" de un ISO string y crea una fecha local,
// evitando el desfase UTC→Colombia que ocurre con new Date(isoString).
export const fmtLocalDate = (iso: string): string => {
  const [y, m, d] = iso.substring(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CO');
};
