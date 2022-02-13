const client = require ('../../API/client');
const {SUPER_ADMINS_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return client.get(SUPER_ADMINS_API_URL);
}
export const getById= (id)=>
{
    return client.getById(SUPER_ADMINS_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(SUPER_ADMINS_API_URL,body);
    return data;
}
export const put= async(body, id)=>
{
    const data = client.put(SUPER_ADMINS_API_URL,body, id);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(SUPER_ADMINS_API_URL, body ,id);
    return data;
}

export const deleteItem= async(id)=>
{
    const data = client.deleteItem(SUPER_ADMINS_API_URL, id);
    return data;
}