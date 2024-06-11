import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import { Master } from "../models/Master";

const table = "master";
const db = DatabaseConnection.getConnection();

export default class MasterService{
    static async findAll(){
        let master = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`,[],(_,{rows})=>{
                    resolve(rows);
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

    static async checkMasterPass(password:string){
        
        let master = new Master();

        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`,[],(_,{rows})=>{
                    resolve(rows);
                    master = rows._array[0];
                }),(sqlError:SQLError)=>{
                    console.log("Erro ao buscar master: "+sqlError);
                }             
            }        
        ))
             
        if(master.password == password){          
            return true;
        }else{          
            return false;         
        }
    }

    static async addMaster(password:string){
        let master = false;
        master =  await this.findAll();
        let msg = '';           

        if(!master){
            await new Promise((resolve, reject)=> db.transaction(
                tx=>{
                    tx.executeSql(`insert into ${table} (password) 
                        values (?)`, 
                        [password],
                        (_,{rows,insertId})=>{
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
            return msg;
    }    
}