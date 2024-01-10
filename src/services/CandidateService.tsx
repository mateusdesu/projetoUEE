import { Candidate } from "../models/Candidate";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";

const table = "candidate";
const db = DatabaseConnection.getConnection();
var candidates:Array<Candidate> = [];


export default class CandidateService{
    
    static async addCandidate(candidate: Candidate){
        let add = false;
       await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`insert into ${table} (name, vice_name, number, picture_path, electionId, party, position,votes) 
                values (?,?,?,?,?,?,?,?)`, 
                [candidate.name, candidate.vice_name, candidate.number,candidate.picture_path, candidate.electionId, candidate.party, candidate.position,0],
                (_,{rows,insertId})=>{
                    
                    if(insertId !== undefined){
                        add = true;
                    }

                    resolve(rows);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr); 
                }
            }
            
        ));  

        return add;
    }


    static async deleteCandidate(id:number|null){
        let del = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                if(id != null){
                    tx.executeSql(`delete from ${table} where id = ${id}`,[],(_,{rows,rowsAffected})=>{
                        resolve(rows);
                        if(rowsAffected >= 1){
                            del = true;
                        }
                    }),(sqlError:SQLError)=>{
                        console.log("Erro ao excluir candidato: "+sqlError);
                    }
                }               
            }
        ));

        return del;
    }   

    static async findAll(){
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`, [],(_,{rows})=>{
                    resolve(rows._array);
                    candidates = rows._array;
                }),(sqlErr:SQLError)=>{
                    console.log("Falha na busca de candidatos: "+sqlErr);
                }
            }
        ));
        
        return candidates;
        
    }



    static async findByNumber(number:string, electionId:number){
        let numCad = false;
        
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table} where electionId = ${electionId} and number = ${number}`,[],(_,{rows})=>{
                    resolve(rows._array);
                    candidates = rows._array;
                })
            }
        ));
        return numCad;
    }

    static async findByElectionId(electionId:number){
        let numCad = false;
        
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table} where electionId = ${electionId}`,[],(_,{rows})=>{
                    resolve(rows._array);
                    candidates = rows._array;

                    if(rows._array.length >= 1){
                        numCad = true;
                    }
                    
                })
            }
        ));
        return numCad;
    }

    static async deleteCandidatesByElectionId(electionId:number|null){
        let del = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                if(electionId != null){
                    tx.executeSql(`delete from ${table} where electionId = ${electionId}`,[],(_,{rows,rowsAffected})=>{
                        resolve(rows);
                        if(rowsAffected >= 1){
                            del = true;
                        }
                    }),(sqlError:SQLError)=>{
                        console.log("Erro ao excluir candidato: "+sqlError);
                    }
                }               
            }
        ));

        return del;
    }
}