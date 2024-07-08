import moment from "moment";

export const calculeTimeDelivery = (finishTime) => {
  const diff = moment(finishTime, "DD/MM/YYYY HH:mm").diff(
    moment(new Date(), "DD/MM/YYYY HH:mm")
  );
  const deliveryTime = Math.round(moment.duration(diff).asMinutes()) + " minutos";
  return deliveryTime;
};
