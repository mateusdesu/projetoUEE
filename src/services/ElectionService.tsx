import { Election } from "../models/Election";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import ImageService from "./ImageService";
import CandidateService  from "./CandidateService"; 

const db = DatabaseConnection.getConnection();
const table = "election";
var elections: Array<Election> = [];

export default class ElectionService{
    
    static addElection(election: Election){
        return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`insert into ${table} (name, password, positions) 
                values (?,?,?)`, 
                [election.name, election.password, election.positions],
                (_,{rows,insertId})=>{
                    console.log("Eleição inserida: "+insertId);
                    ImageService.createDir(election.name);                 
                    resolve(true);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                    reject(false);
                }
            }          
        ));
    }

    static result(idElection:number){
         
    }

    static findAll(){
       return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`,[],(_,{rows})=>{
                    //console.log("FA El: "+rows.length);
                    //resolve(rows._array);
                    //elections = rows._array;
                    resolve(rows);
                    //console.log("FA ELEC: "+elections);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao buscar eleições: "+sqlErr);
                    //reject(null);
                }
            }
        ));

        //return elections;
    }
}