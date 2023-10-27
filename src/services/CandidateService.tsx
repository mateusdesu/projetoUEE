import { Candidate } from "../models/Candidate";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import * as fs from 'expo-file-system';

const table = "candidate";
const db = DatabaseConnection.getConnection();
var candidates:Array<Candidate> = [];


export default class CandidateService{
    
    static addCandidate(candidate: Candidate){
        return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`insert into ${table} (name, vice_name, number, picture_path, electionId, party, votes) 
                values (?,?,?,?,?,?,?)`, 
                [candidate.name, candidate.vice_name, candidate.number,candidate.picture_path, candidate.electionId, candidate.party, 0],
                (_,{rows,insertId})=>{
                    console.log("Candidato inserido: "+insertId);
                    resolve(true);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                    reject(false);
                }
            }
            
        ));
    }

    static findAll(electionId: number){
        new Promise((resolve, reject)=> db.transaction(
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
        
    }
}