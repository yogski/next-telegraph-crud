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
  return (
    localStorage.getItem('_token') !== undefined &&
    localStorage.getItem('_title') !== undefined &&
    localStorage.getItem('_table') !== undefined
  );
}

export function clearCredential() {
  localStorage.clear();
}