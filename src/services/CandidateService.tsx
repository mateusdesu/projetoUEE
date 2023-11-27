import { Candidate } from "../models/Candidate";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import * as fs from 'expo-file-system';

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
                    console.log("Candidato inserido: "+insertId);

                    console.log(insertId);
                    
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


    /*static async getCandidateByNumber(number:string, electionId:number){
        let candidate: Candidate;

        await new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select * from candidates where number = ${number} AND electionId = ${electionId}`,[],(_,{rows})=>{
                    resolve(rows);
                    candidates = rows._array;
                    console.log("candidato retornado!");
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao buscar candidato: "+sqlErr); 
                }
            }
        ))

        return candidates;
    }*/

    static deleteCandidate(id:number){
        return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`delete from ${table} where id = ${id}`,[],(_,{rows})=>{
                    resolve(rows.item(0).id);
                }),(sqlError:SQLError)=>{
                    console.log("Erro ao excluir candidato: "+sqlError);
                }
            }
        ))
    }

    /*static async findAll(electionId: number){
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table} where electionId = ${electionId}`, [],(_,{rows})=>{
                    console.log("Finda all: "+rows.length);
                    resolve(rows._array);
                    candidates = rows._array;
                    console.log(candidates);


                }),(sqlErr:SQLError)=>{
                    console.log("Falha na busca de candidatos: "+sqlErr);
                }
            }
        ));
        
        return candidates;
        
    }*/

    static async findAll(){
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`, [],(_,{rows})=>{
                    console.log("Finda all: "+rows.length);
                    resolve(rows._array);
                    candidates = rows._array;
                    console.log(candidates);


                }),(sqlErr:SQLError)=>{
                    console.log("Falha na busca de candidatos: "+sqlErr);
                }
            }
        ));
        
        return candidates;
        
    }
}