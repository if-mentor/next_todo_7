import { Timestamp } from "firebase/firestore";

const parseTimestampToDate = (timestamp: Timestamp|null, separator: string) => {
  if (timestamp != null) {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ("00" + (date.getMonth() + 1)).slice(-2);
    const day = ("00" + date.getDate()).slice(-2);
    const hour = ("00" + date.getHours()).slice(-2);
    const minutes = ("00" + date.getMinutes()).slice(-2);
    
    return `${year}${separator}${month}${separator}${day} ${hour}:${minutes}`;
  }
  return ""
};

export default parseTimestampToDate;
