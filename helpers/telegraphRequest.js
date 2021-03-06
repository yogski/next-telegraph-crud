import axios from 'axios';

export const getDataServerSide = async (config) => {
  const response = await axios.get(process.env.DATA_SOURCE_TELEGRAPH, {...config});
  return JSON.parse(response.data.result.content[0].children[0]);
}

export const getDataClientSide = async (config, url) => {
  console.log('trying to get request...')
  const response = await axios.get(url, {...config});
  return JSON.parse(response.data.result.content[0].children[0]);
}

export const insertData = async (apiKey, dataTitle, tableName, data) => {
  const endpointURL = `https://api.telegra.ph/editPage/${tableName}`
  const response = await axios.get(endpointURL, {
    params: {
      access_token: apiKey,
      title: dataTitle,
      content: JSON.stringify([{tag:"p",children: [JSON.stringify(data)]}]),
      return_content: "true"
    },
  });
  return response.data;
}

export const updateData = async (url, config, data) => {

}

export const deleteById = async (url, config, id) => {

}