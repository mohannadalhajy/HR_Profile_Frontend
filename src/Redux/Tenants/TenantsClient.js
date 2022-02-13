const client = require ('../../API/client');
const {TENANTS_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return client.get(TENANTS_API_URL);
}
export const getById= (id)=>
{
    return client.getById(TENANTS_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(TENANTS_API_URL,body);
    return data;
}
export const put= async(body, id)=>
{
    const data = client.put(TENANTS_API_URL,body, id);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(TENANTS_API_URL, body ,id);
    return data;
}

export const deleteItem= async(id)=>
{
    const data = client.deleteItem(TENANTS_API_URL, id);
    return data;
}