import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AlertBasic } from "../Alert/index.js";
import "./Modal.css";
import { getTimeDelivery } from "../../functionsUseful/getTimeDelivery.js";
import { GetMaps } from "../../services/queryMaps.js";
import { calculeTimeDelivery } from "../../functionsUseful/calculeTimeDelivery.js";
import { ModuleSimple } from "../Fields/modules/moduleSimple.js";
import { ModuleSelect } from "../Fields/modules/moduleSelect.js";

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
    if (!checkedOriginAndDestination()) return;
    const response = await GetMaps(
      data.origin + "," + data.cidadeOrigin,
      data.destination + "," + data.cidadeDestination
    );
    let time = 0;
    if (response.status === 200) {
      time = response.data.routes[0].legs[0].duration.value;
    } else {
      AlertBasic(
        "Atenção",
        "Por favor, verifique o endereço da rota esta correto, não foi possível localizar.",
        "error"
      );
      return;
    }
    const obj = await buildObj(time);
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

  const buildObj = (time) => {
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

  const modules = [
    { id: 1, type: "text", label: "Nome", name: "name", dropDown: false },
    {
      id: 2,
      type: "text",
      label: "Descrição",
      name: "description",
      dropDown: true,
      options: [
        { id: 1, name: "Selecione...", value: "" },
        { id: 2, name: "Humburger", value: "Humburger" },
        { id: 3, name: "Hamburger Duplo", value: "Hamburger Duplo" },
        { id: 4, name: "Hamburger Acebolado", value: "Hamburger Acebolado" },
        { id: 5, name: "Hamburger com Batata", value: "Hamburger com Batata" },
      ],
    },
    {
      id: 3,
      type: "text",
      label: "Logradouro (origem)",
      name: "origin",
      dropDown: false,
    },
    {
      id: 4,
      type: "text",
      label: "Cidade (origem)",
      name: "cidadeOrigin",
      dropDown: false,
    },
    {
      id: 5,
      type: "text",
      label: "Logradouro (destino)",
      name: "destination",
      dropDown: false,
    },
    {
      id: 6,
      type: "text",
      label: "Cidade (destino)",
      name: "cidadeDestination",
      dropDown: false,
    },
  ];

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Incluir Pedido </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row">
            {modules.map((item) =>
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
