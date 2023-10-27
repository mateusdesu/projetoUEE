import { DatabaseConnection } from "./DatabaseConnection";
import { SQLError } from "expo-sqlite";

var db:any = null;

export default class DatabaseInit{
    constructor(){
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on'));

        this.InitDb();
    }

    private InitDb(){
        var sql = ['DROP TABLE IF EXISTS candidate',
                    'DROP TABLE IF EXISTS election',
                    //FOREIGN KEY(electionId) REFERENCES election(id) -> change when create election table
                    'create table if not exists candidate'+
                        '(id integer primary key autoincrement,'+ 
                        'electionId integer not null,'+
                        'name text not null,'+
                        'vice_name text,'+
                        'party text,'+
                        'number integer not null,'+
                        'picture_path text,'+
                        'votes integer not null'
                        +');',

                    'create table if not exists election'+
                        '(id integer primary key autoincrement,'+                       
                        'name text not null,'+
                        'password text not null,'+
                        'positions text not null'+                      
                        ');'
                ] 
        
        
        db.transaction((tr:any) => {
            for(var i=0; i <sql.length; i++){
                tr.executeSql(sql[i]);            
            }
        }, 
        (error: SQLError) =>{
            console.log("error call back: "+ error);
        },
        () => {
            console.log("database was succesfully created!");
        }
        );        
    }
}