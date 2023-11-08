import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";

const table = "master";
const db = DatabaseConnection.getConnection();

export default class MasterService{
    static findAll(){
        let master = false;
        new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`,[],(_,{rows})=>{
                    if(rows._array.length > 0){
                        master = true;
                    }
                }),(sqlError:SQLError)=>{
                    console.log("Erro ao buscar master: "+sqlError);
                }             
            }        
        ))
        return master;
    }

    static addMaster(password:string){
        let master = false;
        master =  this.findAll();
        let msg = '';           

        if(!master){
            new Promise((resolve, reject)=> db.transaction(
                tx=>{
                    tx.executeSql(`insert into ${table} (password) 
                        values (?)`, 
                        [password],
                        (_,{rows,insertId})=>{
                            console.log("Master inserido: "+insertId);
                            resolve(true);
                            msg = "Senha master cadastrada com sucesso!";
                        }),(sqlErr:SQLError)=>{
                            console.log("Erro ao inserir Master: "+sqlErr);
                            reject(false);
                        }
                    }          
                )); 
            }else{
                msg = "Senha master já foi cadastrada previamente!";
            }
            console.log(msg);
            return msg;
    }    
}