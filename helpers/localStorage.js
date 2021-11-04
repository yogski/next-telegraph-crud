export function getCredential() {
  const tokenData = localStorage.getItem('_token');
  const tableData = localStorage.getItem('_table');
  const titleData = localStorage.getItem('_title');

  // security countermeasure?

  return {...JSON.parse(tokenData), ...JSON.parse(tableData), ...JSON.parse(titleData)};
}

export function setCredential(token, table, title) {
  localStorage.setItem('_token', token);
  localStorage.setItem('_table', table);
  localStorage.setItem('_title', title);
}

export function checkCredentialExists() {
  return (localStorage.getItem('_token') && localStorage.getItem('_title') && localStorage.getItem('_table'));
}

export function clearCredential() {
  localStorage.clear();
}