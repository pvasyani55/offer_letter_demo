import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface OfferLetter {
  id?: number;
  employeeId: number;
  employeeName: string;
  htmlContent: string;
  cssContent: string;
  pdfContent?: string;
  templateId?: number;
  status: 'draft' | 'generated' | 'sent' | 'accepted';
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OfferLetterService {

  constructor(private apiService: ApiService) { }

  createOfferLetter(offerLetter: Partial<OfferLetter>): Observable<OfferLetter> {
    return this.apiService.post<OfferLetter>('/offer-letters', offerLetter);
  }

  getOfferLetters(): Observable<OfferLetter[]> {
    return this.apiService.get<OfferLetter[]>('/offer-letters');
  }

  getOfferLetter(id: number): Observable<OfferLetter> {
    return this.apiService.get<OfferLetter>(`/offer-letters/${id}`);
  }

  getOfferLettersByEmployee(employeeId: number): Observable<OfferLetter[]> {
    return this.apiService.get<OfferLetter[]>(`/offer-letters/employee/${employeeId}`);
  }

  updateOfferLetter(id: number, offerLetter: Partial<OfferLetter>): Observable<OfferLetter> {
    return this.apiService.put<OfferLetter>(`/offer-letters/${id}`, offerLetter);
  }

  deleteOfferLetter(id: number): Observable<void> {
    return this.apiService.delete<void>(`/offer-letters/${id}`);
  }
}