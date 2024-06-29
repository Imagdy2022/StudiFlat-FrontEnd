 


export class IApartments {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  succeeded: string;
  errors: string;
  message: string;
  data: Array<{
    apartment_ID: string;
    apartment_Name: string;
    apartment_Image: string;
    apartment_No_Bedrooms: number;
    apartment_Persons_No: number;
    apartment_Area_Square: number;
    apartment_Location: string;
    apartment_Lat: number;
    apartment_Long: number;
    apartment_Type: string;
    apartment_RentDesc: string;
    apt_UUID?: string;
    apt_Code?: string;
    apt_Name?: string;
    apt_Price?: number;
    apt_SecuirtyDep?: number;
    apt_AllBillsIncludes?: boolean;
    apt_BillDescirption?: string;
    apt_StName?: string;
    apt_BuildingNo?: string;
    apt_CityorPostal?: string;
    apt_Area?: string;
    apt_Address?: string;
    apt_SquareMeters?: number;
    apt_FloorNo?: number;
    apt_AptNo?: number;
    apt_MaxGuest?: number;
    apt_Owner?: string;
    statusString?: string;
    apt_Status?: string;
    apt_ThumbImg?: string;
    apt_Descirpt?: string;
    apt_VideoLink?: string;
    typeString?: string;
    apt_types?: string;
    apt_Bedrooms?: number;
    apt_Toilets?: number;
    apt_Living?: number;
    apt_Elevator?: boolean;
    is_Best?: boolean;
    property_Imgs?: Array<any>;
  }>;
}


