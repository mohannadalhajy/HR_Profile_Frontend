const client = require ('../../API/client');
const {RESPONSE_API_URL, RESPONSE_CODE_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return client.get(RESPONSE_API_URL);
}
export const getById= (id)=>
{
    return client.getById(RESPONSE_API_URL,id);
}
export const getByCode= (code)=>
{
    return client.getById(RESPONSE_CODE_API_URL,code);
}
export const patch= async(body, id)=>
{
    const data = client.patch(RESPONSE_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(RESPONSE_API_URL, id);
    return data;
}
