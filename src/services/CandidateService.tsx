import { Candidate } from "../models/Candidate";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import * as fs from 'expo-file-system';

const table = 'candidate';
const db = DatabaseConnection.getConnection();


export default class CandidateService{
    
    static addCandidate(candidate: Candidate){
        return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`insert into ${table} (name, vice_name, number, picture_path, electionId) 
                values (?)`, 
                [candidate.name, candidate.vice_name, candidate.number,candidate.picture_path, candidate.electionId],
                (_,{rows,insertId})=>{
                    console.log("Candidato inserido: "+insertId);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                }
            }
        ));
    }
}