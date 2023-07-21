const validPhone = (val) => val[0] == 0 && val[1] == 5 && val.length === 11;

export { validPhone };