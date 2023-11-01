import * as fs from 'expo-file-system';

var path:string = '';

export default class ImageService{
    static createDir = async(name:string)=>{
        path = `${fs.documentDirectory}images/${name}`;

        await fs.makeDirectoryAsync(path, {}).then(()=>{
            console.log("DIRETÓRIO CRIADO COM SUCESSO!");
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
    static getPic = (dirName:string, candidateNumber:number)=>{
        path = `${fs.documentDirectory}images/${dirName}/${candidateNumber}.jpg`;
        return path;
    }

    //from -> local repository; to -> election name; imageName-> candidate number;
    static uploadPic = async(from:string, to:string, imageName:number)=>{
        await fs.copyAsync({
            from: from,
            to: `${fs.documentDirectory}images/${to}/${imageName}.jpg`
           }).then(()=>{    
            console.log("Upload concluido");
            return to;
           }).catch((err)=>{
            console.log("Erro ao carregar imagem: "+err);
            return '';
           })
    }
}