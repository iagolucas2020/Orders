import moment from "moment";

export const getTimeDelivery = (time) => {
  const convertionMinutes = Math.round(time / 60);
  const timePreparetion = "00:30:00";
  const requestOrder = moment(new Date()).format("DD/MM/YYYY HH:mm");
  const deliveryOrder = moment(new Date())
    .add(timePreparetion, "minutes")
    .add(convertionMinutes, "minutes")
    .format("DD/MM/YYYY HH:mm");
  return { requestOrder, deliveryOrder };
};
