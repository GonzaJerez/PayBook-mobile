import Constants from 'expo-constants'

const BASE_URL = Constants?.manifest?.extra?.baseUrl

interface Body {
  
}

interface Props {
  endpoint: string,
  method: string,
  token?: string,
  body?: Body
}

export const baseApi = async({endpoint,method,token,body}:Props)=>{

  try {
    const resp = await fetch(`${BASE_URL}/api${endpoint}`,{
      method,
      headers:{
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })

    const data = await resp.json();

    return data;

  } catch (error) {
    console.log(error);
  }
}