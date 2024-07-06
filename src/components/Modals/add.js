import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AlertBasic } from "../Alert/index.js";
import "./Modal.css";
import { api } from "../../services/api.js";
import getTimeDelivery from "../../functions/getTimeDelivery.js";

function Add(props) {
  const [data, setData] = useState({
    name: "",
    description: "",
    origin: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  const addOrder = async () => {
    debugger;

    const response = await api.get(
      "json?destination=uberlandia&origin=araguari&key=AIzaSyCjEcdO5wZV5RCWtPbRFYgWeTGs_sDB4ZQ",
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Origin': 'http://localhost:3000/'
        },
      }
    );
    const time = 0;
    if (response.status === "OK") {
      time = response.routes[0].legs.duration.value;
    }
    // const { requestOrder, deliveryOrder, deliveryTime } = getTimeDelivery();
    // const id =
    //   Number(props.data.length) > 0
    //     ? props.data[props.data.length - 1].id + 1
    //     : 1;
    // let obj = {
    //   id: id,
    //   name: data.name,
    //   description: data.description,
    //   origin: data.origin,
    //   destination: data.destination,
    //   requestOrder: requestOrder,
    //   deliveryOrder: deliveryOrder,
    //   deliveryTime: deliveryTime,
    //   status: "Em Andamento",
    // };
    // if (!checkInput(obj)) return;
    // props.funcUpdate(obj);
    // clear();
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

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Incluir Pedido </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row">
            <div class="form-group col-sm-12">
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-12">
              <label>Descrição (lanche):</label>
              <select
                className="form-control"
                name="description"
                onChange={handleChange}
              >
                <option value={""}>selecione...</option>
                <option value={"Hamburger"}>Hamburger</option>
                <option value={"Hamburger Duplo"}>Hamburger Duplo</option>
                <option value={"Hamburger Acebolado"}>
                  Hamburger Acebolado
                </option>
                <option value={"Hamburger com Batata"}>
                  Hamburger com Batata
                </option>
              </select>
            </div>
            <div class="form-group col-sm-12">
              <label>Origem:</label>
              <input
                type="text"
                className="form-control"
                name="origin"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-12">
              <label>Destino:</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                onChange={handleChange}
              />
            </div>
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
