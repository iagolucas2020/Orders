import "bootstrap/dist/css/bootstrap.min.css";
import { FcCancel } from "react-icons/fc";
import { IoIosSend } from "react-icons/io";

export const Table = ({ headerTable, arrayObj, cancelOrder, finishOrder }) => {
  console.log(headerTable);
  return (
    <>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            {headerTable.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arrayObj.map((obj) => (
            <tr key={obj.id}>
              <td>{obj.id}</td>
              <td>{obj.name}</td>
              <td>{obj.description}</td>
              <td>{obj.origin}</td>
              <td>{obj.destination}</td>
              <td>{obj.requestOrder}</td>
              <td>{obj.deliveryOrder}</td>
              <td>{obj.deliveryTime}</td>
              <td>{obj.status}</td>
              <td>
                {obj.status !== "Cancelado" && obj.status !== "Entregue" && (
                  <>
                    <button
                      title="Cancelar Pedido"
                      className="btn"
                      onClick={() => {
                        cancelOrder(obj.id);
                      }}
                    >
                      <FcCancel />
                    </button>
                    <button
                      title="Finalizar Pedido"
                      className="btn"
                      onClick={() => {
                        finishOrder(obj.id);
                      }}
                      style={{ color: "green" }}
                    >
                      <IoIosSend />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
