export const getTagStyles = (tag) => {
  switch (tag) {
    case "praise":
      return {
        borderColor: "border-teal-400/30",
        textColor: "text-teal-400/90",
        plantColor: "text-teal-400",
      };
    case "feedback":
      return {
        borderColor: "border-orange-500/30",
        textColor: "text-orange-500",
        plantColor: "text-orange-500",
      };
    default:
      return {
        borderColor: "border-gray-400",
        textColor: "text-gray-400",
        plantColor: "text-gray-500",
      };
  }
};

export const formatTimeElapsed = (dateString) => {
  const currentDate = new Date();
  const date = new Date(dateString);
  const elapsedMilliseconds = currentDate - date;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedDays / 365);

  if (elapsedYears > 0) {
    const remainingMonths = elapsedMonths - elapsedYears * 12;
    return `${elapsedYears} year${
      elapsedYears > 1 ? "s" : ""
    } and ${remainingMonths} month${remainingMonths > 1 ? "s" : ""} ago`;
  } else if (elapsedMonths > 0) {
    return `${elapsedMonths} month${elapsedMonths > 1 ? "s" : ""} ago`;
  } else if (elapsedDays > 0) {
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${elapsedSeconds} second${elapsedSeconds > 1 ? "s" : ""} ago`;
  }
};

export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
