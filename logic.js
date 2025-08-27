// logic.js
export const state = {
  ingresos: [],
  egresos: [],
  balance: 0,
  porcentajeEgresos: -1,
};

const calcularTotal = (lista) => lista.reduce((total, item) => total + item.valor, 0);

export const agregarItem = (tipo, descripcion, valor) => {
  const nuevoItem = {
    id: Date.now(),
    descripcion,
    valor: parseFloat(valor),
  };
  state[tipo].push(nuevoItem);
};

export const actualizarBalance = () => {
  const totalIngresos = calcularTotal(state.ingresos);
  const totalEgresos = calcularTotal(state.egresos);
  state.balance = totalIngresos - totalEgresos;

  if (totalIngresos > 0) {
    state.porcentajeEgresos = Math.round((totalEgresos / totalIngresos) * 100);
  } else {
    state.porcentajeEgresos = -1;
  }
};