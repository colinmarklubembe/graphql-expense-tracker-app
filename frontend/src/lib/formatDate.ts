export const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
