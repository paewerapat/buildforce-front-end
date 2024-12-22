export const checkImageFile = (file) => {
    console.log("[checkImageFile] file - ", file)
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1920 * 1080) return err = "The largest image size is 2mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) return err = "Image format is incorrect."
    
    return err;
}