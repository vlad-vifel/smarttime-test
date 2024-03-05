

const toRuFormat = (dateString) => {
  const parts = dateString.split(" ");
  let month = "";
  let weekday = "";
  switch (parts[1]) {
    case "Jan":
      month = "Января";
      break;
    case "Feb":
      month = "Февраля";
      break;
    case "Mar":
      month = "Марта";
      break;
    case "Apr":
      month = "Апреля";
      break;
    case "May":
      month = "Мая";
      break;
    case "Jun":
      month = "Июня";
      break;
    case "Jul":
      month = "Июля";
      break;
    case "Aug":
      month = "Августа";
      break;
    case "Sep":
      month = "Сентября";
      break;
    case "Oct":
      month = "Октября";
      break;
    case "Nov":
      month = "Ноября";
      break;
    case "Dec":
      month = "Декабря";
      break;
  }

  switch (parts[2]) {
    case "Mon":
      weekday = "ПН";
      break;
    case "Tue":
      weekday = "ВТ";
      break;
    case "Wed":
      weekday = "СР";
      break;
    case "Thu":
      weekday = "ЧТ";
      break;
    case "Fri":
      weekday = "ПТ";
      break;
    case "Sat":
      weekday = "СБ";
      break;
    case "Sun":
      weekday = "ВС";
      break;
  }

  return parts[0] + " " + month + " (" + weekday + ")";
};

export default toRuFormat;