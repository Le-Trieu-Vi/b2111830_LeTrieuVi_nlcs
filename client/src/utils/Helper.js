class Helper {
  static getFormattedDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  static getIdByToken(token) {
    if (!token) {
      return null;
    }

    const decodeToken = atob(token.split('.')[1]);
    const parseToken = JSON.parse(decodeToken);
    return parseToken.id;
    }

  static customPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}

export default Helper;