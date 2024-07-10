export interface Protein {
  uniParcId: string;
  uniParcCrossReferences: {
    database: string;
    id: string;
    versionI: number;
    version: number;
    active: boolean;
    created: string;
    lastUpdated: string;
    geneName: string;
    proteinName: string;
    organism: {
      scientificName: string;
      commonName: string;
      taxonId: number;
    };
    proteomeId?: string;
    component?: string;
  }[];
  sequence: {
    value: string;
    length: number;
    molWeight: number;
    crc64: string;
    md5: string;
  };
  sequenceFeatures: {
    interproGroup: {
      id: string;
      name: string;
    };
    database: string;
    databaseId: string;
    locations: {
      start: number;
      end: number;
    }[];
  }[];
  oldestCrossRefCreated: string;
  mostRecentCrossRefUpdated: string;
}
