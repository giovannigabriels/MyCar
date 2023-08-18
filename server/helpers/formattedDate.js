function formattedDateToday() {
  //tanggal saat ini
  const today = new Date();

  // Format tanggal dalam format "YYYY-MM-DD"
  return today.toISOString().split("T")[0];
}

module.exports = { formattedDateToday };
