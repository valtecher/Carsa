import axios from 'axios';


const getScrappedModel = async (link:string, handleLoading?:any) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/scraper`, { timeout: 100000, headers: {link}}).then((res:any) => {
    handleLoading(false);
    return res.data;
  })
}

export const scrapperApi = {
  getScrappedModel
}