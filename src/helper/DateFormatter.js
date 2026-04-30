export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function getDateRange(days) {
  const today = new Date();
  const past = new Date();

  past.setDate(today.getDate() - days);

  return {
    startDate: formatDate(past),
    endDate: formatDate(today)
  };
}