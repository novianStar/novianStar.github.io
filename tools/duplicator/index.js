const nameElement = document.getElementById('name');
const addressElement = document.getElementById('address');
const postElement = document.getElementById('post');
const provinceElement = document.getElementById('province');
const phoneElement = document.getElementById('phone');
const storeElement = document.getElementById('store');

const date = new Date().toISOString().split('T')[0].replaceAll('-', '/');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const image = new Image();
image.src = '3.jpg';
image.onload = function () {
    ctx.font = '40px Prompt';
    ctx.fillStyle = '#4c4c4c';
    ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);
    ctx.fillText(Name, 55, 420)
    ctx.fillText(address, 55, 714)
    ctx.fillText(post, 55, 826);
    ctx.fillText(province, 55, 934);
    ctx.fillText(phone, 55, 1120);
    ctx.fillText(store, 55, 1290);
    ctx.fillText(date, 55, 1469)
}

let Name = nameElement.value;
let address = addressElement.value;
let post = postElement.value;
let province = provinceElement.value;
let phone = phoneElement.value;
let store = storeElement.value;

const drawImage = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    ctx.fillText(Name, 55, 420)
    ctx.fillText(address, 55, 714)
    ctx.fillText(post, 55, 826);
    ctx.fillText(province, 55, 934);
    ctx.fillText(phone, 55, 1120);
    ctx.fillText(store, 55, 1290);
    ctx.fillText(date, 55, 1469);
}

nameElement.addEventListener('change', function () {
    Name = this.value; drawImage();
})
addressElement.addEventListener('change', function () {
    address = this.value; drawImage();
})
postElement.addEventListener('change', function () {
    post = this.value; drawImage();
})
provinceElement.addEventListener('change', function () {
    province = this.value; drawImage();
})
phoneElement.addEventListener('change', function () {
    phone = this.value; drawImage();
})
storeElement.addEventListener('change', function () {
    store = this.value; drawImage();
})

document.getElementById('submit').addEventListener('click', () => {
    canvas.toDataURL('image/jpeg', 1.0);
    const link = document.getElementById('link');
    link.setAttribute('download', `${Name}`);
    link.setAttribute('href', canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
    link.click();
})
