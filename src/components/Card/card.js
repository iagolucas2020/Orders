import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";

export const Card = ({ arrayObj, cancelOrder, finishOrder }) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {arrayObj.map((obj) => (
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <h5 class="card-title">
                    {obj.id}: {obj.name}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {obj.description}: {obj.status}
                  </h6>
                  <p class="card-text">
                    O lanche será entregue em até {obj.deliveryTime}.
                  </p>
                  <p>Destino: {obj.destination}</p>
                  {obj.status !== "Cancelado" && obj.status !== "Entregue" && (
                    <>
                      <div className="divButtonCard">
                        <button
                          title="Cancelar Pedido"
                          className="btn btn-danger"
                          onClick={() => {
                            cancelOrder(obj.id);
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          title="Finalizar Pedido"
                          className="btn btn-success"
                          onClick={() => {
                            finishOrder(obj.id);
                          }}
                        >
                          Finalizar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
  );
};
