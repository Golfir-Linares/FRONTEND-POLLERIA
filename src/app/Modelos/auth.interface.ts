export interface AuthResponse{
    token: string;
    status: boolean;
  }

export interface AuthError{
    msg: string;
    status: boolean;
  }

export interface ConfirmResponse{
   msg: string;
  }
  
export interface SignupInterface {
    msg:  string;
    token: string;
    success: boolean;
  }

export interface ForgetPassResponse {
    msg:  string;
    data: string;
  }

export interface VerifyRecoverTokenResponse {
    msg:  string;
    data: Data;
  }

export interface ChangePassResponse {
    msg:  string;
    data: Data;
  }

export interface RegisterData {
  name:           string;
  lastname:       string;
  documentType:   string;
  documentNumber: string;
  email:          string;
  password:       string;
}
  
export interface Data {
    name:           string;
    lastname:       string;
    documentType:   DocumentType;
    documentNumber: string;
    email:          string;
    password:       string;
    address:        string;
    token:          string;
    confirmed:      boolean;
    roles:          string[];
    _id:            string;
    createdAt:      Date;
    updatedAt:      Date;
  }
  
export interface DocumentType {
    _id:       string;
    type:      string;
    createdAt: Date;
    updatedAt: Date;
    slug:      string;
  }
  
  
export interface ProfileInterface {
    _id:            string;
    name:           string;
    documentType:   string;
    documentNumber: string;
    email:          string;
    address:        string;
    confirmed:      boolean;
    roles:          Rol[];
    createdAt:      Date;
    updatedAt:      Date;
  }
  
export interface Rol {
    _id:         string;
    rol:         string;
    permissions: any[];
    createdAt:   Date;
    updatedAt:   Date;
  }