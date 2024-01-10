import { Election } from "../models/Election";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import ImageService from "./ImageService";
import { Candidate } from "../models/Candidate";

const db = DatabaseConnection.getConnection();
const table = "election";

export default class ElectionService{
    
    static async addElection(election: Election){
        let add = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`insert into ${table} (name, password, positions, white_votes,closed) 
                values (?,?,?,?,?)`, 
                [election.name, election.password, election.positions,0,0],
                (_,{rows,insertId})=>{
                    ImageService.createDir(election.name); //OBS: fazer verificação se diretório(eleição) já existe                 
                    

                    if(insertId != undefined){
                        add = true;
                    }

                    resolve(rows);

                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                    reject(false);
                }
            }          
        ));
        return add;
    }

    static async computeWhiteVotes(electionId:number, position:string){
        let voteWasComputed = false;

        await new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`insert into whitevotes (electionId, position) values(?,?)`,[electionId, position],(_,{rows,rowsAffected,insertId})=>{
                    resolve(rows);
                    if(rowsAffected = 1){
                        voteWasComputed = true;
                    }
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                    reject(false);
                }
            }
        ))
        
        return voteWasComputed;
    }    

    static async getWhiteVotes(electionId:number/*,position:string*/){
        let white_votes:Array<{total:number, position:string}> = [];
        await new Promise ((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select position, count(*) as total from whitevotes where electionId = ${electionId} group by position`,[],(_,{rows})=>{
                    resolve(rows);

                    white_votes= rows._array;
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao contabilizar votos brancos: "+sqlErr);
                    reject(false);
                }
            }
        ))
        return white_votes;
    }

    static async hasCandidates(id:number){   
        let hasCandidate = 0; 
          await new Promise ((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select count(electionId) as candidate from candidate where electionId = (?)`,[id],(_,{rows})=>{
                     resolve(rows);

                     hasCandidate= rows.item(0).candidates;

                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao contar candidatos "+sqlErr);
                    reject(false);
                }
            }
        ))
        return hasCandidate;
    }

    static async deleteElection(id:number|null){
        let del = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                if(id != null){
                    tx.executeSql(`delete from ${table} where id = ${id}`,[],(_,{rows,rowsAffected})=>{
                        resolve(rowsAffected);
                        if(rowsAffected >= 1){
                            del = true;
                        }
    
                    }),(sqlError:SQLError)=>{
                        console.log("Erro ao excluir candidato: "+sqlError);
                    }
                }
            }
        ))
        return del
    }


    static async deleteWhiteVotes(id:number|null){
        let del = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                if(id != null){
                    tx.executeSql(`delete from whitevotes where electionId = ${id}`,[],(_,{rows,rowsAffected})=>{
                        resolve(rowsAffected);
                        if(rowsAffected >= 1){
                            del = true;
                        }
    
                    }),(sqlError:SQLError)=>{
                        console.log("Erro ao excluir candidato: "+sqlError);
                    }
                }
            }
        ))
        return del
    }

    static async checkWhiteVotes(electionId:number){
        let numCad = false;
        
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from whitevotes where electionId = ${electionId}`,[],(_,{rows})=>{
                    resolve(rows._array);

                    if(rows._array.length >= 1){
                        numCad = true;
                    }
                    
                })
            }
        ));
        return numCad;
    }

    static async checkElectionCredential(id:number, pass:string){
        let authorized = false;

        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select password from ${table} where id = ${id}`,[],(_,{rows})=>{
                    resolve(rows);
                    let password = rows._array[0].password;

                    if(password === pass){
                        authorized = true;
                    }
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao conferir senha!"+sqlErr);                   
                }
            }
        ))

        return authorized;
    }

    static async countCandidateVotes(id:number){
        let votes = 0;
        await new Promise((resolve,reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select votes from candidate where id = ${id}`,[],(_,{rows})=>{~
                    resolve(rows);
                    votes = rows._array[0].votes;
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao buscar votos!"+sqlErr);
                }
            }
        ))

        return votes;
    }

    static async computeVote(id: number){
        let votes = await this.countCandidateVotes(id);
        let newVotes = votes + 1;
        let voteWasComputed = false;

        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`update candidate set votes = ${newVotes} where id = ${id}`,[],(_,{rows})=>{
                    resolve(rows);
                    voteWasComputed = true;
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao computar voto!"+sqlErr);                   
                }
            }
        ));

        return voteWasComputed;

    }

    static async result(electionId:number){
        let candidates:Array<Candidate> = [];
         await new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select * from candidate where electionId = ${electionId} order by position, votes desc`,[],(_,{rows})=>{
                    resolve(rows._array);
                    candidates = rows._array;
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao gerar resultado: "+sqlErr);                   
                }
            }
         ));

         return candidates;
    }

    static async amountOfVotes(electionId:number){
        let amount = 0;
        await new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select SUM(votes) as votes from candidate where idElection = ${electionId}`,[],(_,{rows})=>{
                    resolve(rows._array);
                    amount = rows._array[0];
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao gerar resultado: "+sqlErr);                   
                }
            }
         ));

         return amount;
    }

    static async closeElection(electionId:number){
        let closed = false;

        await new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`update ${table} set closed = 1`,[],(_,{rows})=>{
                    resolve(rows);
                    closed = true;
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao encerrar eleição: "+sqlErr);                   
                }
            }
        ));
        
        return closed;
    }

    static findAll(){
       return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`,[],(_,{rows})=>{
                    resolve(rows);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao buscar eleições: "+sqlErr);
                }
            }
        ));
    }
}