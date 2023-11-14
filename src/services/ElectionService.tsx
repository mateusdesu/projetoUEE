import { Election } from "../models/Election";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import ImageService from "./ImageService";
import { Candidate } from "../models/Candidate";
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

    static hasCandidates(id:number){    
        new Promise ((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select count(electionId) from candidates where electionId = ${id}`,[],(_,{rows})=>{
                    let hasCandidate = Number(resolve(rows.item(0)));
                    
                    if(hasCandidate > 0){
                        return true
                    }else{
                        return false;
                    }
                })
            }
        ))
    }

    static deleteElection(id:number){
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

    static checkElectionCredential(id:number, pass:string){
        let authorized = false;

        new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select password from ${table} where id = ${id}`,[],(_,{rows})=>{
                    resolve(rows._array);
                    let password = rows._array[0].password;

                    if(password.equals(pass)){
                        authorized = true;
                    }
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao conferir senha!"+sqlErr);                   
                }
            }
        ))

        return authorized;
    }

    static computeVote(id: number, votes:number){
        let newVotes = votes + 1;
        let voteWasComputed = false;

        new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`update candidates set votes = ${newVotes} where id = ${id}`,[],(_,{rows})=>{
                    console.log("Voto computado!");
                    voteWasComputed = true;
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao computar voto!"+sqlErr);                   
                }
            }
        ));

        return voteWasComputed;

    }

    static result(electionId:number){
        let candidates:Array<Candidate> = [];
         new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select * from candidates where idElection = ${electionId} order by votes desc`,[],(_,{rows})=>{
                    resolve(rows._array);
                    candidates = rows._array;
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao gerar resultado: "+sqlErr);                   
                }
            }
         ));

         return candidates;
    }

    static amountOfVotes(electionId:number){
        let amount = 0;
        new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select SUM(votes) as votes from candidates where idElection = ${electionId}`,[],(_,{rows})=>{
                    resolve(rows._array);
                    amount = rows._array[0];
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao gerar resultado: "+sqlErr);                   
                }
            }
         ));

         return amount;
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