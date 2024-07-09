import Swal from "sweetalert2";

function AlertBasic(title, msg, status) {
  Swal.fire({
    title: title,
    text: msg,
    icon: status,
  });
}

function AlertBasicHtml(title, html, status) {
  Swal.fire({
    title: title,
    html: html,
    icon: status,
    confirmButtonText: 'Ir para o link',
  }).then((result) => {
    if (result.isConfirmed) {
      window.open("https://cors-anywhere.herokuapp.com/")
    }
  });;
}

async function AlertConfirm(title, msg, status) {
  const result = await Swal.fire({
    title: title,
    text: msg,
    icon: status,
    showDenyButton: true,
    denyButtonText: 'Não',
    confirmButtonText: 'Sim'
  });

  return result;
}

export { AlertBasic, AlertConfirm, AlertBasicHtml };
