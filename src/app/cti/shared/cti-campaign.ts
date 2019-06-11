export interface CtiCampaign {
  DataDo: Date | string;
  DataOd: Date | string;
  Id: number;
  IdZewnetrzne: string;
  IloscProb: number;
  KampaniaDialerId: number;
  Nazwa: string;
  Notatka: string;
  UserMod: string;
  UserUtw: string;
  cDataMod: Date | string;
  cDataUtw: Date | string;
  flgAktywna: boolean;
  flgGSM: boolean;
  flgStatus: number;
  flgTelOsKon: boolean;
  flgTelStac: boolean;
  flgWeekendy: boolean;
}
