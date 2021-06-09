import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  constructor() { }


  private gFlights : string[][] = [['DSM','ORD'],['ORD','BGI'],['BGI','LGA'],['LGA','TLV']]

  public getFlights(){
    return this.gFlights
  }
}
