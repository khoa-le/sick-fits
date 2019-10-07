export default function(amount) {
  const options = {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2,
  };

  options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('vi-VN', options);
  return formatter.format(amount);
}
