const client = require ('../../API/client');
const {DISPLAY_API_URL} = require ('../../constants/index');

export const get= ()=>
{
    return client.get(DISPLAY_API_URL);
}
export const patch= async(body)=>
{
    const data = client.patchWithoutId(DISPLAY_API_URL, body);
    return data;
}