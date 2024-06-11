import * as fs from 'expo-file-system';

var path:string = '';

export default class ImageService{
    static createDir = async(name:string)=>{
        path = `${fs.documentDirectory}images/${name}`;

        await fs.makeDirectoryAsync(path, {}).then(()=>{
            return true;
        }).catch((err)=>{
            console.log("FALHA AO CRIAR DIRETÓRIO: "+err);
            return false;
        })
    }


    //check the necessity of this function
    static getDir = async(dirName:string)=>{
        path = `${fs.documentDirectory}images/${dirName}`;
        let dir = await fs.getInfoAsync(path);

        if(!dir.exists){
          await this.createDir(dirName);
          return path;
        }else{
            return path;
        }
        
    }

    //mount the image path using the file system to get the image
    static getPic = (dirName:string, pictureName:string)=>{
        path = `${fs.documentDirectory}images/${dirName}/${pictureName}.jpg`;
        return path;
    }

    //from -> local repository; to -> election name; imageName-> candidate number_candidate position;
    static uploadPic = async(from:string, to:string, imageName:string)=>{
        path = `${fs.documentDirectory}images/${to}/${imageName}.jpg`
        await fs.copyAsync({
            from: from,
            to: path
           }).then(()=>{    
            return path;
           }).catch((err)=>{
            console.log("Erro ao carregar imagem: "+err);
            return '';
           })
           return path;
    }
}