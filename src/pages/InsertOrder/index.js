import "./insertOrder.css";
import { useState } from "react";
import { AlertBasic, AlertConfirm } from "../../components/Alert";
import Add from "../../components/Modals/add";
import "bootstrap/dist/css/bootstrap.min.css";
import { calculeTimeDelivery } from "../../functionsUseful/calculeTimeDelivery";
import { Table } from "../../components/Table/table";
import { FaBorderAll, FaList } from "react-icons/fa";
import { Card } from "../../components/Card/card";

function InsertOrder() {
  const [data, setData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [seeFormList, setSeeFormList] = useState(false);

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

  const updateOrders = async (arrayOrders) => {
    const orders = [...data, arrayOrders];
    setData(orders);
    setVisibleModal(false);
    AlertBasic("Adicionar", "Pedido Adicionado com sucesso.", "success");
  };

  const updateTimeDelivery = () => {
    const amountOrder = document.getElementsByClassName("order").length;
    if (data.length === amountOrder) {
      if (data.length > 0) {
        let arrayUpdateTime = [];
        data.forEach((item) => {
          if (item.status === "Em Andamento") {
            item.deliveryTime = calculeTimeDelivery(item.deliveryOrder);
          } else {
            item.deliveryTime = "00 minutos";
          }
          arrayUpdateTime.push(item);
        });
        setData(arrayUpdateTime);
      }
    }
  };

  setTimeout(async () => {
    updateTimeDelivery();
  }, 30000);

  return (
    <>
      <div className="container-sm container divContainer">
        <header>
          <div className="divBtnNew">
            <button
              className="btn btn-success"
              onClick={() => {
                openModal();
              }}
            >
              Novo Pedido
            </button>
          </div>
        </header>
        <br />
        <div className="seeOrders">
          <h2>Pedidos</h2>
          <div>
            <button
              title="Ver em forma de lista"
              className="btn"
              onClick={() => {
                setSeeFormList(true);
              }}
            >
              <FaList color="white" />
            </button>
            <button
              title="Ver em forma de cars"
              className="btn"
              onClick={() => {
                setSeeFormList(false);
              }}
            >
              <FaBorderAll color="white" />
            </button>
          </div>
        </div>
        {seeFormList ? (
          <Table
            arrayObj={data}
            cancelOrder={cancelOrder}
            finishOrder={finishOrder}
          />
        ) : (
          <Card
            arrayObj={data}
            cancelOrder={cancelOrder}
            finishOrder={finishOrder}
          />
        )}
        <Add
          visible={visibleModal}
          func={() => {
            setVisibleModal(!visibleModal);
          }}
          funcUpdate={(arrayOrders) => {
            updateOrders(arrayOrders);
          }}
          data={data}
        />
      </div>
    </>
  );
}

export default InsertOrder;
