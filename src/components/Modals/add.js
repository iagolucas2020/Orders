import "./Modal.css";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AlertBasic, AlertBasicHtml } from "../Alert/index.js";
import { getTimeDelivery } from "../../functionsUseful/getTimeDelivery.js";
import { GetMaps } from "../../services/queryMaps.js";
import { calculeTimeDelivery } from "../../functionsUseful/calculeTimeDelivery.js";
import { ModuleSimple } from "../Fields/modules/moduleSimple.js";
import { ModuleSelect } from "../Fields/modules/moduleSelect.js";
import { modulesAdd } from "../../modules/modulesAdd.js";

function Add(props) {
  const [data, setData] = useState({
    name: "",
    description: "",
    origin: "",
    destination: "",
  });

  const [lastId, setLastId] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const addOrder = async () => {
    let obj = {};
    if (!checkedOriginAndDestination()) return;
    const response = await GetMaps(
      data.origin + "," + data.cidadeOrigin,
      data.destination + "," + data.cidadeDestination
    );
    if (response.status === 200) {
      obj = await buildObj(response.data.routes[0].legs[0]);
    } else {
      AlertBasicHtml(
        "Atenção",
        "Por favor, clique neste link: https://cors-anywhere.herokuapp.com/ para habitar o CORS temporário da aplicação.",
        "error"
      );
      return;
    }
    if (!checkInput(obj)) return;
    props.funcUpdate(obj);
    clear();
  };

  const clear = () => {
    setData({
      name: "",
      description: "",
      origin: "",
      destination: "",
    });
  };

  const checkInput = (obj) => {
    for (var prop in obj) {
      if (obj[prop] === "") {
        AlertBasic(
          "Atenção",
          "Preencher todos os campos para adicionar pedido.",
          "error"
        );
        return false;
      }
    }
    return true;
  };

  const buildObj = (route) => {
    const time = route.duration.value;
    const distance = route.distance.text;
    const { requestOrder, deliveryOrder } = getTimeDelivery(time);
    const id = lastId > 0 ? lastId + 1 : 1;
    setLastId(id);
    return {
      id: id,
      name: data.name,
      description: data.description,
      origin: data.origin,
      destination: data.destination,
      requestOrder: requestOrder,
      deliveryOrder: deliveryOrder,
      deliveryTime: calculeTimeDelivery(deliveryOrder),
      distance: distance,
      status: "Em Andamento",
    };
  };

  const checkedOriginAndDestination = () => {
    if (data.origin === "" || data.destination === "") {
      AlertBasic(
        "Atenção",
        "Por favor, preencher origem e destino de entrega.",
        "error"
      );
      return false;
    }
    return true;
  };

  
  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Incluir Pedido </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row">
            {modulesAdd.map((item) =>
              item.dropDown === false ? (
                <ModuleSimple
                  key={item.id}
                  type={item.type}
                  label={item.label}
                  name={item.name}
                  handleChange={handleChange}
                />
              ) : (
                <ModuleSelect
                  key={item.id}
                  type={item.type}
                  label={item.label}
                  name={item.name}
                  handleChange={handleChange}
                  options={item.options}
                />
              )
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="modalFooter">
        <button
          disabled={!data.name}
          className="btn btn-primary"
          onClick={() => {
            addOrder();
          }}
        >
          Incluir
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.func();
          }}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default Add;
