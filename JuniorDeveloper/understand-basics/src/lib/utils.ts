import { Request } from "express";

export function validateRequest(request: Request){
  if(request){
    return true;
  }
  return false;
}



export function matchRoles(roles: string[], userRole: string){
  if(roles.includes(userRole)) return true;
  return false;
}
