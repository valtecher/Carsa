import axios from 'axios';


const getScrappedModel = async (link:string, handleLoading?:any) => {
  return await axios.get(`http://localhost:3000/api/scraper`, { timeout: 10000, headers: {link}}).then((res:any) => {
    handleLoading(false);
    return res.data;
  })
}

export const scrapperApi = {
  getScrappedModel
}