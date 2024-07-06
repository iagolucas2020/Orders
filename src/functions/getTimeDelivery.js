import moment from "moment";

export const getTimeDelivery = () => {
  const timePreparetion = "00:30:00";
  const requestOrder = moment(new Date()).format("DD/MM/YYYY HH:mm");
  const deliveryOrder = moment(new Date())
    .add(timePreparetion, "minutes")
    .format("DD/MM/YYYY HH:mm");
  const diff = moment(deliveryOrder, "DD/MM/YYYY HH:mm").diff(
    moment(requestOrder, "DD/MM/YYYY HH:mm")
  );
  const deliveryTime = moment.duration(diff).asMinutes() + " minutos";

  return { requestOrder, deliveryOrder, deliveryTime };
};
