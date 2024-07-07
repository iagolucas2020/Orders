import "./insertOrder.css";
import { useState } from "react";
import { AlertBasic, AlertConfirm } from "../../components/Alert";
import Add from "../../components/Modals/add";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcCancel } from "react-icons/fc";
import { IoIosSend } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function InsertOrder() {
  const [data, setData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [id, setId] = useState("");

  const openModal = () => {
    setVisibleModal(!visibleModal);
  };

  const cancelOrder = async (id) => {
    const response = await AlertConfirm(
      "Cancelamento",
      "Tem certeza que deseja cancelar este pedido, id: " + id + ".",
      "question"
    );
    if (response.isConfirmed) {
      let filterOrders = await AlterStatusOrder(id, "Cancelado");
      setData(filterOrders);
      AlertBasic("Cancelamento", "Pedido cancelado com sucesso.", "success");
    }
  };

  const finishOrder = async (id) => {
    const response = await AlertConfirm(
      "Finalizar",
      "Tem certeza que deseja finalizar este pedido, id: " + id + ".",
      "question"
    );
    if (response.isConfirmed) {
      let filterOrders = await AlterStatusOrder(id, "Entregue");
      setData(filterOrders);
      AlertBasic("Finalização", "Pedido entregue com sucesso.", "success");
    }
  };

  const AlterStatusOrder = (id, status) => {
    let filterOrders = [];
    const orders = data;
    orders.forEach((item) => {
      if (item.id === id) {
        item.status = status;
      }
      filterOrders.push(item);
    });
    return filterOrders;
  };

  const getData = async (arrayOrders) => {
    setData([...data, arrayOrders]);
    setVisibleModal(false);
    AlertBasic("Adicionar", "Pedido Adicionado com sucesso.", "success");
  };

  const detailsOrder = (id) => {
    <Link to={"/Details/" + id}></Link>;
  };

  return (
    <>
      <div className="container-sm container divContainer">
        <header>
          <div>
            <h2>Pedidos</h2>
            <button
              className="btn btn-success"
              onClick={() => {
                openModal();
              }}
            >
              Novo
            </button>
          </div>
        </header>
        <br />
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Hora Pedido</th>
              <th>Entrega Pedido</th>
              <th>Tempo Entrega</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.description}</td>
                <td>{order.origin}</td>
                <td>{order.destination}</td>
                <td>{order.requestOrder}</td>
                <td>{order.deliveryOrder}</td>
                <td>{order.deliveryTime}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== "Cancelado" &&
                    order.status !== "Entregue" && (
                      <>
                        <button
                          title="Cancelar Pedido"
                          className="btn"
                          onClick={() => {
                            cancelOrder(order.id);
                          }}
                        >
                          <FcCancel />
                        </button>
                        <button
                          title="Finalizar Pedido"
                          className="btn"
                          onClick={() => {
                            finishOrder(order.id);
                          }}
                          style={{ color: "green" }}
                        >
                          <IoIosSend />
                        </button>
                      </>
                    )}
                  {/* <button
                    title="Ver Detalhes Pedido"
                    className="btn"
                    onClick={() => {
                      detailsOrder(order.id);
                    }}
                    style={{ color: "blue" }}
                  >
                    <FaEye />
                  </button> */}
                  {/* <Link to={"/Details/" + order.id}>Detalhes</Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Add
          visible={visibleModal}
          func={() => {
            setVisibleModal(!visibleModal);
          }}
          funcUpdate={(arrayOrders) => {
            getData(arrayOrders);
          }}
          data={data}
        />
      </div>
    </>
  );
}

export default InsertOrder;
