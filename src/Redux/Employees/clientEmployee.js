const client = require ('../../API/client');
const {EMPLOYEES_API_URL, UPLOAD_IMAGE_API_URL, V_CARD_API_URL, EMPLOYEE_DETAILS_API_URL, QRS_API_URL, DOWNLOAD_V_CARDS_API_URL, SEARCH_EMPLOYEES_API_URL, EXPORT_EXCEL_API_URL, IMPORT_V_CARDS_API_URL, IMPORT_EXCEL_API_URL, DELETE_EMPLOYEES_API_URL, IMPORT_PROGRESS_PERCENTAGE_API_URL, EXPORT_PROGRESS_PERCENTAGE_API_URL, V_CARD_GUEST_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return client.get(EMPLOYEES_API_URL);
}
export const getImportProgressPercentage= ()=>
{
    return client.get(IMPORT_PROGRESS_PERCENTAGE_API_URL);
}
export const getExportProgressPercentage= ()=>
{
    return client.get(EXPORT_PROGRESS_PERCENTAGE_API_URL);
}
export const getByPage= (page, take)=>
{
    return client.get(EMPLOYEES_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(EMPLOYEES_API_URL,id);
}
export const getByIdGuest= (id, tenantId)=>
{
    return client.getBy2Id(EMPLOYEE_DETAILS_API_URL,id, tenantId);
}
export const download_vCard= (id)=>
{
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) return client.download_vCard(V_CARD_API_URL,id);
    return client.download_vCard(V_CARD_GUEST_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(EMPLOYEES_API_URL,body);
    return data;
}
export const search= async(body)=>
{
    const data = client.post(SEARCH_EMPLOYEES_API_URL+"?&page="+body.page+"&take="+body.take,{search:body.search});
    return data;
}
export const put= async(body, id)=>
{
    const data = client.put(EMPLOYEES_API_URL,body, id);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(EMPLOYEES_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(EMPLOYEES_API_URL, id);
    return data;
}
export const upload_image= async(image)=>
{
    const data = client.post(UPLOAD_IMAGE_API_URL,image);
    return data;
}
export const importVCard= async(VCard)=>
{
    const data = client.post(IMPORT_V_CARDS_API_URL,VCard);
    return data;
}
export const importExcel= async(VCard)=>
{
    const data = client.post(IMPORT_EXCEL_API_URL,VCard);
    return data;
}
export const downloadQRs= async(body)=>
{
    return client.downloadQRs(QRS_API_URL,body);
}
export const deleteEmployees= async(body)=>
{
    return client.post(DELETE_EMPLOYEES_API_URL,body);
}
export const exportExcel= async(body)=>
{
    return client.exportExcel(EXPORT_EXCEL_API_URL,body);
}
export const downloadVCards= async(body)=>
{
    return client.downloadQRs(DOWNLOAD_V_CARDS_API_URL,body);
}

