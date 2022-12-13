const NOCODB_TOKEN = 'nocodb_token';

function getToken() {
  return localStorage.getItem(NOCODB_TOKEN);
}

function setToken(token: string) {
  return localStorage.setItem(NOCODB_TOKEN, token);
}

function cleanToken() {
  localStorage.removeItem(NOCODB_TOKEN);
}

const Storage = {
  getToken,
  setToken,
  cleanToken,
};

export default Storage;
