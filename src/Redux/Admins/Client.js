const client = require ('../../API/client');
const {ADMINS_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return client.get(ADMINS_API_URL);
}
export const getByTenant=(tenant)=>{
    return client.getById(ADMINS_API_URL,tenant)
}
export const getById= (tenantId, id)=>
{
    return client.getByIdTwoParams(ADMINS_API_URL, tenantId, id);
}
export const post= async(body, tenant)=>
{
    const data = client.post(ADMINS_API_URL+'/'+tenant,body);
    return data;
}
export const put= async(body, id)=>
{
    const data = client.put(ADMINS_API_URL,body, id);
    return data;
}
export const patch= async(body, tenantId, id)=>
{
    const data = client.patchTwoParams(ADMINS_API_URL, body , tenantId, id);
    return data;
}

export const deleteItem= async(tenantId,id)=>
{
    const data = client.deleteItemTwoParams(ADMINS_API_URL, tenantId, id);
    return data;
}