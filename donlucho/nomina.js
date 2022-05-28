const url = "https://nomina-api-cj.herokuapp.com/empleados";
fetch(url)
  .then((response) => response.json())
  .then((data) => getData(data))
  .catch((error) => console.log(error));

const getData = (data) => {
  let body = "";
  const bonificacion = [];
  const deduccion = [];
  for (let i = 0; i < data.length; i++) {
    let montosB = data[i].bonificacions;
    let totalB = 0;
    for (let j = 0; j < montosB.length; j++) {
      totalB += parseFloat(montosB[j].monto);
    }

    if (data[i].bonificacions.length == 0) {
      bonificacion.push(0);
    } else {
      bonificacion.push(totalB);
    }
  }

  for (let i = 0; i < data.length; i++) {
    let montosD = data[i].deduccions;
    let totalD = 0;
    for (let j = 0; j < montosD.length; j++) {
      totalD += parseFloat(montosD[j].monto);
    }

    if (data[i].deduccions.length == 0) {
      deduccion.push(0);
    } else {
      deduccion.push(totalD);
    }
  }

  console.log(bonificacion);

  for (let i = 0; i < data.length; i++) {
    let total = (
      parseFloat(data[i].sueldo) +
      bonificacion[i] -
      deduccion[i]
    ).toFixed(2);
    body += `
    <tr>
      <th scope="row">${data[i].id}</th>
      <td>${data[i].dni}</td>
      <td>${data[i].nombre}</td>
      <td>${data[i].apellido}</td>
      <td>${data[i].sueldo}</td>
      <td>${bonificacion[i].toFixed(2)}</td>
      <td>${deduccion[i].toFixed(2)}</td>
      <td>${total}</td>
    </tr>
    `;
  }

  document.getElementById("data").innerHTML = body;
};
