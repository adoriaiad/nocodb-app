export interface IClientiPaginate {
  list: IList[];
  PageInfo: IPageInfo;
}

export interface IPageInfo {
  pageSize: number;
  totalRows: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  page: number;
}

export interface IList {
  Id: number;
  'Nome Azienda': string;
  CreatedAt: string;
  UpdatedAt: string;
  'nc_cg5q__Attività di sales_id': number;
  'Referente Interno': IReferenteInterno;
  'Referente Cliente': IReferenteCliente;
  'nc_cg5q___nc_m2m_g39ls2g8tu List': INcCg5QNcM2MList;
  Stato: string;
  Logo: string;
  'Attività di sales': IAttivitàDiSales;
  SitoWeb: string;
  'nc_cg5q___nc_m2m_gpjflyfu_x List': INcCg5QNcM2MList;
  Memo: string;
  'nc_cg5q___nc_m2m_w4nua1w_65 List': INcCg5QNcM2MList;
  'Esperienze List': IEsperienzeList;
}

export interface IAttivitàDiSales {
  Id: number;
  Memo: string;
  CreatedAt: string;
  UpdatedAt: string;
  'Data Fine': string;
  Stato: string;
  'Valore Commerciale': number;
  'Data Inizio': string;
}

export interface IEsperienzeList {
  Id: number;
  Descrizione: string;
  CreatedAt: string;
  UpdatedAt: string;
  DataInizio: string;
  DataFine: string;
}

export interface IReferenteCliente {
  Id: number;
  Nome: string;
  CreatedAt: string;
  UpdatedAt: string;
  Tel: string;
  Memo: string;
  Cognome: string;
  linkedin: string;
  email: string;
  ImgProfilo: string;
  Ruoli: string;
  'Data Di Nascita': string;
  Alias: string;
}

export interface IReferenteInterno {
  Id: number;
  Nome: string;
  CreatedAt: string;
  UpdatedAt: string;
  Abilitato: number;
  Tel: string;
  Alias: string;
  Office365Id: string;
  Ruolo: string;
  Email: string;
  foto: string;
  Cognome: string;
  nc_cg5q__CompetenzeWorkforce_id: number;
}

export interface INcCg5QNcM2MList {
  table2_id: number;
  table1_id: number;
}
