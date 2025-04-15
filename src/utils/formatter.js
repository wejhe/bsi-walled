export const formatCurrency = (input) => {
  const numericValue = input.replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const normalizedPhoneNumber = (phone) => {
  if (typeof phone !== "string") {
    phone = String(phone);
  }

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("62")) {
    cleaned = "0" + cleaned.slice(2);
  } else if (!cleaned.startsWith("0")) {
    cleaned = "0" + cleaned;
  }

  return cleaned;
};

export const convertToUTC7 = (transactions) => {
  return transactions.map(tx => {
      const utcDate = new Date(tx.transactionDate);

      const utc7Date = new Date(utcDate.getTime() - 7 * 60 * 60 * 1000);
      
      return {
          ...tx,
          transactionDate: utc7Date.toISOString()
      };
  });
}
