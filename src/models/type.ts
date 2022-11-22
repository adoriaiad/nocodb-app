export interface ITeamMember {
  Id: string;
  Nome: string;
  Cognome: string;
  UserName: string;
  Email: string;
  Progetti: IProject[];
  Ruolo: IRole;
}

export interface IProject {
  Id: string;
  Nome: string;
  DataInizio: string;
  DataFine: string;
}

export interface IRole {
  Id: string;
  Nome: string;
}
