export const SET_OPENED_HEADER_LINK = '@app/SET_OPENED_HEADER_LINK'; 



export const setOpenedLink = (link:string) => {
  return {
    type: SET_OPENED_HEADER_LINK, 
    link
  }
}
