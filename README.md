#Laçamentos de Pedidos Delivery

<h2>Como Rodar o projeto<h2>
<h3>IMPORTANTE: ler passo a passo</h3>
<h5>Assim que realizar o download do projeto:</h5>
<ul>
    <li>Baixar os packages, comando: npm install;</li>
    <li>Rodar o projeto: npm start;</li>
    <li>Acessar o link: https://cors-anywhere.herokuapp.com/ e habilitar o CORS para realizar as requisições do endereço no Google Maps, conforme imagem abaixo;</li>
    <li>Após este processo pode-se utilizar a aplicação.</li>
</ul>
![habilitCors](https://i.postimg.cc/pdvvv8XG/Imagem-do-Whats-App-de-2024-07-08-s-11-04-25-dcec2785.jpg)

<h2>Sobre o Projeto<h2>
<h4>Rotas das páginas</h4>
<ul>
    <li>Foi instalado a lib: react-router-dom, biblioteca que auxilia no processo de navegação entre as pages;</li>
    <li>Criação uma pasta Routes e arquivo routes.js, a qual são inseridos as rotas das pages do projetos.</li>
    <li>A partir disso a function de inicialização do projeto index.js requisita a function App.js, a qual requisita a function de routes.js, e segue a lógica do projeto.</li>
</ul>

<h4>Services</h4>
<ul>
    <li>Service é pasta que fica a logica des requisições de api;</li>
    <li>Foi utilizada a lib: axios para fazer as requisições;</li>
     <li>function api.js  fica o link de requisições e local que foi instanciado a seção da api pelo axios;</li>
     <li>function queryMaps.js foi criado para fazer a get no Google Maps a partir da instancia do api.js, para realizar essas requições na api do Google Maps foi necessário criar uma conta no google e gerar um token quando é realizado as requisições.</li>
</ul>

```
import axios from "axios";


const linkApi = {
  link: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions",
};

const api = axios.create({
  baseURL: linkApi.link,
});

export { linkApi, api };
```
    
<h4>Pages: Inserção de Pedidos</h4>
<ul>
    <li>Foi criado uma page que fazer a inserção dos pedidos, nesta page possui:</li>
    <li>
        <ul>
            <li>Um botão Novo Pedido, que chama uma modal de inserção do pedido;</li>
            <li>Uma header que fica o titulo de Pedidos e opção de você visualizar os pedidos em forma de LIST ou CARDS, que chama os componentes TABLE e CARD;</li>
            <li>A lógica de atualização do tempo de entrega (setTimeout) que chama a function updateTimeDelivery;</li>
            <li>A lógica de status do pedido que pode-se CANCELAR ou FINALIZAR, e as functions de cancelamento e finalização</li>
            <li>Link Imagem: ![PageInsertOrders](https://github.com/iagolucas2020/Orders/assets/60789632/28705839-eac8-4e30-9f2d-40639bf423aa)</li>
        </ul>
    </li>
</ul>

<h4>Componente Model Add</h4>
<ul>
    <li>Esse componente é utilizar para lançar novos pedidos, neste possui:</li>
        <li>
        <ul>
            <li>As input para lançar os dados do nome pedido como: nome, descrição do produto...;</li>
            <li>A function que captura os dados do formulários, conforme as mudanças na input;</li>
            <li>Um verificador para verificar se todas as input estão preenchidas, caso não esteja retorna uma alerta: ![alertAviso](https://github.com/iagolucas2020/Orders/assets/60789632/f32498e9-44b8-4aa8-a748-e68fa9c320f7)
</li>
            <li>Um function para construir o obj e salvar os dados; </li>
            <li>Link Imagem: ![ModalPageInsert](https://github.com/iagolucas2020/Orders/assets/60789632/dd10b3b4-05a1-4229-8ffb-4616b9efe9e7)</li>
        </ul>
    </li>
</ul>

<h4>Logica de atualização do tempo de entrega</h4>
<p>Tempo de atualização é de 30 em 30 segundos;</p>

```
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
```


<h4>Componentes</h4>
<ul>
    <li>Table que constroi as tabelas, imagem: ![compTable](https://github.com/iagolucas2020/Orders/assets/60789632/1a3fb5d1-cc46-41cf-9209-ca79d8732b1d)
;</li>
    <li>Card que constroi os cards do pedidos, imagem: ![compCard](https://github.com/iagolucas2020/Orders/assets/60789632/edb642ad-8a6a-450b-91ab-87f43cc9df75)
</li>
    <li>Modulo de label e input</li>
    <li>Modulo de dropdown list</li>
    <li>Header e footer da aplicação;</li>
    <li>Card que constroi os cards;</li>
    <li>Alert da onde são gerado os avisos.</li>
</ul>


