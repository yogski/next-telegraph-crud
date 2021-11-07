export function getCredential() {
  const tokenData = localStorage.getItem('_token');
  const tableData = localStorage.getItem('_table');
  const titleData = localStorage.getItem('_title');

  // security countermeasure?

  return {token: tokenData, table: tableData, title: titleData};
}

export function setCredential(token, table, title) {
  localStorage.setItem('_token', token);
  localStorage.setItem('_table', table);
  localStorage.setItem('_title', title);
}

export function checkCredentialExists() {
  console.log(localStorage.getItem('_token'), localStorage.getItem('_title'), localStorage.getItem('_table'))
  return (
    localStorage.getItem('_token') !== null &&
    localStorage.getItem('_title') !== null &&
    localStorage.getItem('_table') !== null
  );
}

export function clearCredential() {
  localStorage.clear();
}