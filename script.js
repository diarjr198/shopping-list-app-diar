let floating_btn = document.getElementById('floating_btn');
let modal = document.getElementById('modal');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let date_list = document.getElementById('date_list');
let root = document.getElementById('root');

const monthNames = [
  'Januari',
  'Febuari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const getCurrentDate = () => {
  var currentdate = new Date();
  var date =
    currentdate.getDate() +
    ' ' +
    monthNames[currentdate.getMonth()] +
    // (currentdate.getMonth() + 1) +
    ' ' +
    currentdate.getFullYear();

  return date;
};

const getCurrentTime = () => {
  var currenttime = new Date();

  var time =
    (currenttime.getHours().toString().length < 2
      ? '0' + currenttime.getHours()
      : currenttime.getHours()) +
    ':' +
    (currenttime.getMinutes().toString().length < 2
      ? '0' + currenttime.getMinutes()
      : currenttime.getMinutes()) +
    ':' +
    (currenttime.getSeconds().toString().length < 2
      ? '0' + currenttime.getSeconds()
      : currenttime.getSeconds());
  return time;
};

let list_product = [];

date_list.innerHTML = getCurrentDate();

floating_btn.addEventListener('click', () => {
  if (modal.style.display == 'none') {
    showModal();
    return;
  }

  hideModal();
});

modal_bg.addEventListener('click', () => {
  hideModal();
});

addlist_form.addEventListener('submit', (event) => {
  event.preventDefault();

  let nameProduct = event.target.product.value;
  let priceProduct = event.target.price.value;

  if (priceProduct === '' || nameProduct === '') {
    alert('Isi Dulu Boy...');
    hideModal();
    return;
  }

  list_product.push({
    name: nameProduct,
    price: priceProduct,
    time: getCurrentTime(),
  });

  event.target.product.value = '';
  event.target.price.value = '';

  renderToHtml();
  hideModal();
});

function showModal() {
  modal.style.display = 'flex';
  floating_btn.style.backgroundColor = '#ffab0e';
  floating_btn.style.transform = 'rotate(-45deg)';
}

function hideModal() {
  modal.style.display = 'none';
  floating_btn.style.backgroundColor = '#ffb62f';
  floating_btn.style.transform = 'rotate(0deg)';
}

function renderToHtml() {
  root.innerHTML = '';

  list_product.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
      <p>${e.time}</p>
      <div>${e.name} <span>${e.price}</span></div>
      <button onclick="handleDelete(${i})">Done</button>
    </div>`;
  });
}

function handleDelete(index) {
  list_product.splice(index, 1);
  renderToHtml();
}
