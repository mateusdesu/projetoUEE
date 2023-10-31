import * as fs from 'expo-file-system';

var path:string = '';

export default class ImageService{
    static createDir = async(name:string)=>{
        path = `${fs.documentDirectory}images/${name}`;

        await fs.makeDirectoryAsync(path, {}).then(()=>{
            console.log("DIRETÓRIO CRIADO COM SUCESSO!");
        }).catch((err)=>{
            console.log("FALHA AO CRIAR DIRETÓRIO: "+err);
        })
    }

    static getDir = (dirName:string, candidateNumber:number)=>{
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