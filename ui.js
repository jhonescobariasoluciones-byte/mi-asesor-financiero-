// ui.js
import { state, agregarItem, actualizarBalance } from './logic'; // Sin .js

const balanceEl = document.getElementById('balance-valor');
const ingresosEl = document.getElementById('ingresos-valor');
const egresosEl = document.getElementById('egresos-valor');
const porcentajeEgresosEl = document.getElementById('egresos-porcentaje');
const ingresosListEl = document.getElementById('ingresos-lista');
const egresosListEl = document.getElementById('egresos-lista');
const form = document.getElementById('formulario');

const formatMoneda = (valor) =>
  valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

const render = () => {
  const totalIngresos = state.ingresos.reduce(
    (total, item) => total + item.valor,
    0
  );
  const totalEgresos = state.egresos.reduce(
    (total, item) => total + item.valor,
    0
  );

  balanceEl.textContent = formatMoneda(state.balance);
  ingresosEl.textContent = formatMoneda(totalIngresos);
  egresosEl.textContent = formatMoneda(totalEgresos);
  porcentajeEgresosEl.textContent =
    state.porcentajeEgresos > 0 ? `${state.porcentajeEgresos}%` : '---';

  ingresosListEl.innerHTML = '';
  egresosListEl.innerHTML = '';

  state.ingresos.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'lista-item ingresos';
    li.innerHTML = `<span>${item.descripcion}</span><span>${formatMoneda(item.valor)}</span>`;
    ingresosListEl.appendChild(li);
  });

  state.egresos.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'lista-item egresos';
    li.innerHTML = `<span>${item.descripcion}</span><span class="egreso-valor">${formatMoneda(item.valor)}</span>`;
    egresosListEl.appendChild(li);
  });
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const tipo = event.target.tipo.value;
  const descripcion = event.target.descripcion.value;
  const valor = event.target.valor.value;

  if (
    descripcion.trim() === '' ||
    valor.trim() === '' ||
    Number.isNaN(parseFloat(valor))
  ) {
    return;
  }

  agregarItem(tipo, descripcion, valor);
  actualizarBalance();
  render();

  event.target.reset();
  event.target.descripcion.focus();
};

export default function init() {
  // ...
  form.addEventListener('submit', onFormSubmit);
  render();
}
