import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";

export const Card = ({ arrayObj, cancelOrder, finishOrder }) => {
  return (
    <>
      <div className="form-group">
        <div className="row">
          {arrayObj.map((obj) => (
              <div key={obj.id} class="card order" style={{ width: "18rem" }}>
                <div class="card-body">
                  <h5 class="card-title">
                    {obj.id}: {obj.name}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {obj.description}: <strong style={{color:'red'}}>{obj.status}</strong>
                  </h6>
                  <p class="card-text">
                    O lanche será entregue em até <strong>{obj.deliveryTime}</strong>.
                  </p>
                  <p><strong>Destino: </strong>{obj.destination}</p>
                  <p><strong>Distância: </strong>{obj.distance}</p>
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
