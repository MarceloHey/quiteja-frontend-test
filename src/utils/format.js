const formatDateToPtBR = (date) => {
  if (date && date.includes(' ')) {
    const dateFormatted = date.split(' ')[0].split('-').reverse().join('/')
    return dateFormatted
  }

  if (date && date.includes('T')) {
    const dateFormatted = date.split('T')[0].split('-').reverse().join('/')
    return dateFormatted
  }

  return '--'
}

const formatPhone = (value) => {
  if (!value) return "--";

  let formattedValue = value.replace(/\D/g, "");
  formattedValue = value.replace(/(\d{2})(\d)/, "($1) $2");
  formattedValue = value.replace(/(\d)(\d{4})$/, "$1-$2");

  return formattedValue ? formattedValue : value
}

const formatCpfOrCnpj = (value) => {
  if (value) {
    const cnpjCpf = value.replace(/\D/g, "");
    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        "$1.$2.$3-$4"
      );
    } else if (cnpjCpf.length === 14) {
      return cnpjCpf.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        "$1.$2.$3/$4-$5"
      );
    } else {
      return value;
    }
  }
}

export { formatDateToPtBR, formatPhone, formatCpfOrCnpj }